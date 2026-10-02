# Setting up mentor / teacher / student accounts

The site's login system runs on [Firebase](https://firebase.google.com/) (a free
Google service). Nothing runs on your own server. The whole site is still just
`index.html` on GitHub Pages, and Firebase supplies the account system and the
shared database that lets a mentor or teacher see a student's progress. This takes
about 5 minutes and is free for a site this size (well within Firebase's free "Spark" plan).

> **A note on names.** "Student" is the label shown everywhere in the UI, but the
> role is still stored as `mentee` in the database, and the security rules below
> still check for `mentee`, so nothing here needs migrating. "Teacher" is a real
> stored role (`teacher`) that behaves exactly like `mentor`; the two are
> interchangeable in every rule and feature, only labelled differently.

## 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/) and sign in with any Google account.
2. Click **Add project**, give it a name (e.g. `geo0460-mentoring`), and finish the wizard (you can turn off Google Analytics; it isn't needed).

## 2. Turn on Email/Password sign-in

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under the **Sign-in method** tab, click **Email/Password**, enable it, and **Save**.

(Students pick a plain username, not an email. The site turns that
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

    // lowercase letters, numbers, dots, dashes and underscores, up to 40 long
    function validUsername(name) {
      return name is string && name.matches('^[a-z0-9_.-]{1,40}$');
    }

    match /users/{uid} {
      // Signed-out visitors (the sign-up form) can only see mentor and teacher
      // profiles. A student's profile is visible to the student, their own
      // mentor or teacher, and admins.
      allow read: if resource.data.role in ['mentor', 'teacher'] ||
        isSelf(uid) || isAdmin() ||
        (request.auth != null && resource.data.mentorUid == request.auth.uid);
      allow create: if isSelf(uid) &&
        validUsername(request.resource.data.username) &&
        (!('isAdmin' in request.resource.data) || request.resource.data.isAdmin == false) &&
        !('mentorInviteCodeUsed' in request.resource.data) &&
        (
          request.resource.data.role == 'mentee' ||
          (
            request.resource.data.role in ['mentor', 'teacher'] &&
            (!('mentorApproved' in request.resource.data) || request.resource.data.mentorApproved == false) &&
            exists(/databases/$(database)/documents/inviteClaims/$(uid))
          )
        );
      allow update: if isAdmin() ||
        (isSelf(uid) && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['mentorUid'])) ||
        (isSelf(uid) &&
          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['username']) &&
          validUsername(request.resource.data.username));
      allow delete: if isAdmin();
    }

    // Proof that someone typed the right invite code when signing up as a
    // mentor or teacher. It can only be created with the correct code, and
    // only admins can read it, so the code never sits on a public profile.
    match /inviteClaims/{uid} {
      allow create: if isSelf(uid) &&
        request.resource.data.keys().hasOnly(['code']) &&
        request.resource.data.code ==
          get(/databases/$(database)/documents/config/mentorInvite).data.code;
      allow read, delete: if isAdmin();
    }

    // only admins can read/write config docs (e.g. the mentor invite code)
    // from the site itself; everyone else is denied by default. The
    // invite-code check above still works for a non-admin signup attempt
    // because rules evaluate get() with full backend access, regardless of
    // what read permission the path itself has.
    match /config/{document} {
      allow read, write: if isAdmin();
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

Click **Publish**. In plain terms: anyone, even signed out (the sign-up form
needs to show the mentor/teacher list *before* someone has an account), can
see mentor and teacher profiles, but not students'; a student's profile is
visible only to them, their own mentor or teacher, and admins. A normal
person can create their own profile and change only their own mentor/teacher
choice and their own username (letters, numbers, dots, dashes and underscores
only). Signing up as a **mentor** or **teacher** additionally requires the
invite code from step 4a below. The code is checked through a private
`inviteClaims` record that only admins can read, so it never appears on a
profile, and even then the new account starts unapproved until an admin
confirms it (see step 7). An **admin** (see step 7) can edit or delete
*anyone's* profile (role, mentor assignment, admin status, approval) and
read or delete anyone's progress; and an approved mentor or teacher can *read
and write* the progress of any student whose profile names them as the mentor.
That's what lets a mentor change a student's topic and case-study status from
the student's page on the dashboard, for example during a session together.

> **Trust note:** this means a student's self-assessed progress is no longer
> theirs alone to edit: their mentor or teacher can change it too. That's the
> point (working through a topic with a student, you can mark it there and
> then), but it's a real shift from "only I can touch my own data," worth
> being aware of if that ever matters for how you present this to students.

> **Updating from an earlier version of these rules?** Publish this version
> at the same time as you deploy the matching site code. The old rules expect
> the invite code on the profile and the new site no longer sends it (and the
> other way round), so mixing them breaks mentor and teacher sign-up. Older
> mentor and teacher profiles may still have a `mentorInviteCodeUsed` field;
> it's removed automatically the next time an admin opens **Manage
> everyone**, or you can delete it by hand in the Firestore **Data** tab. If
> that code was ever exposed, it's worth changing it too (step 4a).

> If you already published an earlier version of these rules and are seeing
> a **"Could not load..."** / `permission-denied` error on the sign-up
> form, that was this exact issue in an earlier draft. Paste the block
> above in and Publish again. The same applies if **"Change username"** in the
> Account popup fails with a permission error, or if **Teacher** signup is
> rejected: the `allow update` line now also lets someone rename themselves,
> and the `allow create` line now also accepts `role == 'teacher'`, so
> re-paste and Publish.

> **Change username also needs one Auth setting off.** The rename moves the
> account's fake login email, which newer Firebase projects block unless email
> verification runs first, and no real mail can reach a `…@geo0460-mentoring.local`
> address. In the console: **Build → Authentication → Settings → User actions**,
> untick **Email enumeration protection**, and Save. Without this, "Change
> username" reports that it's blocked by a Firebase setting and nothing changes.

## 4a. Set the mentor invite code

Anyone signing up with the role **Mentor** has to enter this code, and it's
checked by the security rule you just published as well as by the page, so it
can't be bypassed from the browser console. This first-time setup has to be
done directly in the Firebase console, since there's no admin yet to use the
dashboard's version of this (see below):

1. Firebase console → **Build → Firestore Database → Data**.
2. Click **Start collection**, name it exactly `config`.
3. For the first document, set the **Document ID** to exactly `mentorInvite` (don't use "Auto-ID").
4. Add one field: name `code`, type **string**, value whatever phrase you want people to type (e.g. `geo0460-mentor-2026`). Save.

Once you have an admin (step 7), you don't need to come back here again:
the **Manage everyone** panel on [dashboard.html](dashboard.html) has a
"Mentor invite code" box where any admin can view and change it, e.g. to
rotate it if it's been shared more widely than intended. Only admins can
read or write this document from the site at all. Everyone else, including
a plain mentor, gets denied even trying, by the security rule.

## 5. Get your web app config

1. Project settings (gear icon, top left) → scroll to **Your apps** → click the **</>** (web) icon.
2. Give it any nickname and click **Register app**. Firebase Hosting isn't needed, so skip that step.
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

Open [cloud.js](cloud.js) (the shared login/database setup used by both
`index.html` and `dashboard.html`), find `const firebaseConfig = {` near the
top, and replace the placeholder values with the real ones from step 5.
Commit and push, and that's it.

Until this step is done, the site works exactly as it did before (progress
saved locally in the browser only) and the Log in / Sign up buttons show a
friendly "not set up yet" message instead of failing silently.

## 7. Make your first admin

Admins get a **Manage everyone** panel on the separate [dashboard.html](dashboard.html)
page (linked from the sidebar as "Mentor / teacher / admin dashboard" once they qualify)
to reassign any student to any mentor or teacher, change anyone's role between
student / mentor / teacher, grant or remove admin on mentors and teachers, and
remove accounts. Nobody can make
*themselves* an admin from the site. That field can only be set by an
existing admin, or, for the very first one, by you directly in the database:

1. Sign up on the live site as normal, with the role **Mentor** and the invite code from step 4a. (You'll land in the "pending approval" state. That's expected, and fine to ignore for this first setup.)
2. In the Firebase console: **Build → Firestore Database → Data**.
3. Open the **users** collection and click the document that matches your account (match it by the `username` field).
4. Click **Add field**: field name `isAdmin`, type **boolean**, value `true`. Save.
5. Refresh the site and log back in. A **Mentor / teacher / admin dashboard** link should now appear in the sidebar; it opens [dashboard.html](dashboard.html) with the **Manage everyone** panel on it.

Admin status alone unlocks full mentor features too (you don't also need to
separately approve yourself), because the site treats an admin as an approved
mentor regardless of that field. From then on, that admin can approve
pending mentors and grant admin to other mentors straight from the panel, with
no more manual database editing needed.

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
you already deleted**, that's this split. You (or the admin panel)
deleted the Firestore record, but the login in **Authentication → Users**
is still there, and that's what sign-up actually checks against. Delete
that row (search by `username@geo0460-mentoring.local`) and the username
frees up immediately.

**To wipe everything at once** (e.g. clearing all test accounts before real
students sign up): in Firestore's **Data** tab, hover the `users` collection
name → the **⋮** that appears → **Delete collection** (confirms by asking
you to type the collection name, then recursively deletes every document in
it), then do the same for `progress`. Then in **Authentication → Users**, select all
rows and **Delete accounts**.

## Notes

- **This needs to be viewed over `http(s)://`**, not by double-clicking the
  HTML file. The login system is loaded as a JavaScript module, which browsers
  block on `file://` links. GitHub Pages already serves it correctly; for local
  testing, run a tiny local server, e.g. `python -m http.server` in this folder
  and open `http://localhost:8000`.
- **apiKey being "public" is normal and fine.** Firebase's web `apiKey` isn't a
  secret. It just identifies which project to talk to. Real protection comes
  from the security rules in step 4, which is why they matter.
- A student picks their mentor or teacher from a dropdown when they sign up,
  or "No mentor, I'm studying on my own" (stored as `mentorUid: null`), and
  can change it later from the **Account** button after logging in.
- Anyone logged in can change their own password from **Account** (it asks for
  the current one). Nobody can reset a *forgotten* password from the site:
  that needs Firebase's server-side Admin SDK, which a free-plan static site
  can't call, and the fake emails can't receive Firebase's reset email. The
  way back in is to remove the account in **Manage everyone**, delete its
  login under **Build → Authentication → Users** (see "Deleting accounts"
  below), and have the student sign up again with the same username. Their
  old progress doesn't carry over.
- Anyone logged in can rename themselves from the **Account** button
  ("Change username", asks for the current password). It moves the account's
  fake login email too, so they use the new name to log in afterwards. See
  the two setup caveats under step 4 (rules re-publish + Email enumeration
  protection off).
- A mentor or teacher's **My students** section, on [dashboard.html](dashboard.html),
  lists every student who has picked them, synced the last time each student had
  the site open. Clicking a student shows their status on every topic and case
  study, and the mentor can change it there. The main site doesn't show mentors
  any student progress; it's only on the dashboard.
- The dashboard page checks the same login session as the main site (Firebase
  keeps you signed in across pages). If you're logged out, its **Log in**
  button opens the main site's login form and brings you back afterwards.
- A plain student who opens `dashboard.html` directly sees a polite "nothing
  here for you" message and a link back, rather than any mentor/admin data.
- Admin status only ever shows real effect for mentors and teachers (students
  don't get a dashboard to manage), but the rules don't hard-block setting it
  on a student. The admin panel just won't show them anything extra either way.
- A new mentor or teacher signup is unapproved until an admin ticks the
  **Approved** checkbox for them in **Manage everyone** (it's unticked by
  default for a new mentor/teacher row, same place as the Admin checkbox).
  Until approved, they're treated like an ordinary student (no "I'm a mentor"
  toggle, no students list, no dashboard access), even though their account's
  `role` is already `mentor` or `teacher`. That checkbox can be unticked again
  too, e.g. to revoke access without changing their role. Losing or forgetting
  the invite code is not fatal: an admin can approve someone from the panel
  regardless of whether they used a code, since the code only gates *signup*,
  not approval.
