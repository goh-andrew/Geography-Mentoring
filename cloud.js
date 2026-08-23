/* =====================================================================
   Cloud accounts (Firebase) — shared setup for index.html and
   dashboard.html. Mentor/mentee login and progress sync run on this.

   Setup required before this works: create a free Firebase project,
   turn on Email/Password sign-in, create a Firestore database, paste
   your config below, and apply the security rules from
   FIREBASE_SETUP.md. Until firebaseConfig is filled in, the site still
   works exactly as before (local-only, no login) — auth calls just
   fail with a clear error in the login/signup form.
   ===================================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoLIyjPnFhx5ruP8o0geyyG2JXE-XiZ6E",
  authDomain: "geography-mentoring.firebaseapp.com",
  projectId: "geography-mentoring",
  storageBucket: "geography-mentoring.firebasestorage.app",
  messagingSenderId: "654153239718",
  appId: "1:654153239718:web:e3fb7bb9656584ae39b867",
  measurementId: "G-BRBQFY5KE4"
};
const EMAIL_DOMAIN = 'geo0460-mentoring.local'; // usernames become username@this-fake-domain for Firebase Auth

let fbApp=null, auth=null, db=null, fbReady=false;
try{
  fbApp=initializeApp(firebaseConfig);
  auth=getAuth(fbApp);
  db=getFirestore(fbApp);
  fbReady = !String(firebaseConfig.apiKey).startsWith('REPLACE_');
}catch(e){ console.warn('Firebase did not initialise', e); }

export { auth, db, fbReady };

export function usernameToEmail(u){ return u.trim().toLowerCase().replace(/[^a-z0-9_.-]/g,'') + '@' + EMAIL_DOMAIN; }
export function cleanUsername(u){ return u.trim().toLowerCase().replace(/[^a-z0-9_.-]/g,''); }

export function friendlyAuthError(e){
  const c = e && e.code || '';
  if(!fbReady) return 'Accounts are not set up on this site yet — see FIREBASE_SETUP.md.';
  if(c==='auth/email-already-in-use') return 'That username is already taken.';
  if(c==='auth/invalid-credential'||c==='auth/wrong-password'||c==='auth/user-not-found') return 'Wrong username or password.';
  if(c==='auth/weak-password') return 'Password needs to be at least 6 characters.';
  if(c==='auth/invalid-email') return 'Enter a username using letters, numbers, dots, - or _.';
  if(c==='auth/network-request-failed') return 'Network error — check your connection.';
  return e && e.message ? e.message : 'Something went wrong. Try again.';
}

export function esc(s){ return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }
