# Setting up mentor/mentee accounts

The site's login system runs on [Firebase](https://firebase.google.com/) (a free
Google service). Nothing runs on your own server — the whole site is still just
`index.html` on GitHub Pages, and Firebase supplies the account system and the
shared database that lets a mentor see a mentee's progress. This takes about
5 minutes and is free for a site this size (well within Firebase's free "Spark" plan).

## 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/) and sign in with any Google account.
2. Click **Add project**, give it a name (e.g. `geo0460-mentoring`), and finish the wizard (you can decline Google Analytics — it isn't needed).

## 2. Turn on Email/Password sign-in

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under the **Sign-in method** tab, click **Email/Password**, enable it, and **Save**.

(Mentees pick a plain username, not an email — the site quietly turns that
username into a fake address like `username@geo0460-mentoring.local` behind
the scenes, since Firebase's login system is built around emails. No real
email is ever sent or needed.)

## 3. Create the database

1. Left sidebar: **Build → Firestore Database → Create database**.
2. Choose any nearby location, and start in **production mode** (we'll paste in proper rules next).

## 4. Paste in the security rules

Still in Firestore, open the **Rules** tab and replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSelf(uid) { return request.auth != null && request.auth.uid == uid; }
    function isAdmin() {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    match /users/{uid} {
      allow read: if true;
      allow create: if isSelf(uid) &&
        (!('isAdmin' in request.resource.data) || request.resource.data.isAdmin == false);
      allow update: if isAdmin() ||
        (isSelf(uid) && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['mentorUid']));
      allow delete: if isAdmin();
    }

    function isMyMentor(uid) {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(uid)).data.mentorUid == request.auth.uid;
    }

    match /progress/{uid} {
      allow read: if isSelf(uid) || isAdmin() || isMyMentor(uid);
      allow write: if isSelf(uid) || isAdmin() || isMyMentor(uid);
      allow delete: if isAdmin();
    }
  }
}
```

Click **Publish**. In plain terms: anyone — even signed out, since the
sign-up form needs to show the mentor list *before* someone has an account —
can see the (non-secret) list of usernames and roles; a normal person can
create their own profile and change only their own mentor choice; an
**admin** (see step 7) can edit or delete *anyone's* profile — role, mentor
assignment, admin status — and read or delete anyone's progress; and a
mentor can additionally *read and write* the progress of any mentee whose
profile names them as the mentor — so a mentor can mark a mentee's topic and
case-study status on their behalf, e.g. during a session together, the same
way the mentee could themselves.

> **Trust note:** this means a mentee's self-assessed progress is no longer
> theirs alone to edit — their mentor can change it too. That's the point
> (a mentor working through a topic with a mentee can tick it off there and
> then), but it's a real shift from "only I can touch my own data," worth
> being aware of if that ever matters for how you present this to students.

> If you already published an earlier version of these rules and are seeing
> a **"Could not load mentors"** / `permission-denied` error on the sign-up
> form, that was this exact issue in an earlier draft — just paste the block
> above in and Publish again.

## 5. Get your web app config

1. Project settings (gear icon, top left) → scroll to **Your apps** → click the **</>** (web) icon.
2. Give it any nickname and click **Register app**. Firebase Hosting isn't needed — skip that step.
3. It will show a `firebaseConfig` object like:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "geo0460-mentoring.firebaseapp.com",
  projectId: "geo0460-mentoring",
  storageBucket: "geo0460-mentoring.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 6. Paste it into the site

Open [cloud.js](cloud.js) — the shared login/database setup used by both
`index.html` and `dashboard.html` — find `const firebaseConfig = {` near the
top, and replace the placeholder values with the real ones from step 5.
Commit and push — that's it.

Until this step is done, the site works exactly as it did before (progress
saved locally in the browser only) and the Log in / Sign up buttons show a
friendly "not set up yet" message instead of failing silently.

## 7. Make your first admin

Admins get a **Manage everyone** panel on the separate [dashboard.html](dashboard.html)
page (linked from the sidebar as "Mentor / admin dashboard" once they qualify)
to reassign any mentee to any mentor, promote/demote mentor ↔ mentee, grant or
remove admin on other mentors, and remove accounts. Nobody can make
*themselves* an admin from the site — that field can only be set by an
existing admin, or, for the very first one, by you directly in the database:

1. Sign up on the live site as normal, with the role **Mentor**.
2. In the Firebase console: **Build → Firestore Database → Data**.
3. Open the **users** collection and click the document that matches your account (match it by the `username` field).
4. Click **Add field**: field name `isAdmin`, type **boolean**, value `true`. Save.
5. Refresh the site and log back in — a **Mentor / admin dashboard** link should now appear in the sidebar; it opens [dashboard.html](dashboard.html) with the **Manage everyone** panel on it.

From then on, that admin can grant admin to other mentors straight from the panel — no more manual database editing needed.

> **On "remove accounts":** removing someone in the admin panel deletes their
> profile and progress from the database, so they disappear from every list
> and a mentor loses visibility into them immediately. It does **not** delete
> their actual login (that requires Firebase's server-side Admin SDK, which a
> plain static site can't call). If you want their login fully gone too,
> remove them in the admin panel first, then in the Firebase console go to
> **Build → Authentication → Users**, find them by their fake email
> (`username@geo0460-mentoring.local`), and delete them there.

## Deleting accounts / clearing test data

Two separate things hold a person's data, and deleting one doesn't touch the
other:

| To remove... | Where |
|---|---|
| Their profile + progress (topic/case levels) | Admin panel → **Remove**, or delete the matching docs in Firestore's `users` and `progress` collections |
| Their actual login | Firebase console → **Build → Authentication → Users** |

**If sign-up says "That username is already taken" for a username you're sure
you already deleted** — that's this exact split. You (or the admin panel)
deleted the Firestore record, but the login in **Authentication → Users**
is still there, and that's what sign-up actually checks against. Delete
that row (search by `username@geo0460-mentoring.local`) and the username
frees up immediately.

**To wipe everything at once** (e.g. clearing all test accounts before real
students sign up): in Firestore's **Data** tab, hover the `users` collection
name → the **⋮** that appears → **Delete collection** (confirms by asking
you to type the collection name, then recursively deletes every document in
it) — repeat for `progress`. Then in **Authentication → Users**, select all
rows and **Delete accounts**.

## Notes

- **This needs to be viewed over `http(s)://`**, not by double-clicking the
  HTML file — the login system is loaded as a JavaScript module, which browsers
  block on `file://` links. GitHub Pages already serves it correctly; for local
  testing, run a tiny local server, e.g. `python -m http.server` in this folder
  and open `http://localhost:8000`.
- **apiKey being "public" is normal and fine.** Firebase's web `apiKey` isn't a
  secret — it just identifies which project to talk to. Real protection comes
  from the security rules in step 4, which is why they matter.
- A mentee picks their mentor from a dropdown when they sign up, and can
  change it later from the **Account** button after logging in.
- A mentor's **My mentees** section, on [dashboard.html](dashboard.html), lists
  every mentee who has selected them, with each mentee's topic *and*
  case-study confidence — synced the last time that mentee had the site open.
- The dashboard page checks the same login session as the main site (Firebase
  keeps you signed in across pages), so log in on the main page first, then
  follow the sidebar link — there's no separate login form on the dashboard.
- A plain mentee who opens `dashboard.html` directly sees a polite "nothing
  here for you" message and a link back, rather than any mentor/admin data.
- Admin status only ever shows real effect for mentors (mentees don't get a
  dashboard to manage), but the rules don't hard-block setting it on a
  mentee — the admin panel just won't show them anything extra either way.
