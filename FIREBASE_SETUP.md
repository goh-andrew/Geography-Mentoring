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

    match /users/{uid} {
      allow read: if request.auth != null;
      allow create, update: if isSelf(uid);
      allow delete: if false;
    }

    match /progress/{uid} {
      allow read: if isSelf(uid) ||
        (request.auth != null &&
         get(/databases/$(database)/documents/users/$(uid)).data.mentorUid == request.auth.uid);
      allow write: if isSelf(uid);
    }
  }
}
```

Click **Publish**. In plain terms: anyone logged in can see the (non-secret)
list of usernames and roles, so mentees can pick a mentor from a list; each
person can only write their *own* progress; and a mentor can additionally
*read* the progress of any mentee whose profile names them as the mentor.

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

Open [index.html](index.html), find `const firebaseConfig = {` near the top of
the `<script type="module">` block, and replace the six `"REPLACE_WITH_..."`
placeholder values with the real ones from step 5. Commit and push — that's it.

Until this step is done, the site works exactly as it did before (progress
saved locally in the browser only) and the Log in / Sign up buttons show a
friendly "not set up yet" message instead of failing silently.

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
- A mentor's **My mentees** section (new sidebar link, appears after they log
  in) lists every mentee who has selected them, with each mentee's topic and
  case-study confidence — synced the last time that mentee had the site open.
