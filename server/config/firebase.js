const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const admin = require('firebase-admin');

// Client SDK for auth operations
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let app = null;
let auth = null;
let db = null;
let firebaseEnabled = false;

const hasAllClientConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId
].every(Boolean);

const hasPlaceholderApiKey =
  typeof firebaseConfig.apiKey === 'string' &&
  firebaseConfig.apiKey.toLowerCase().includes('your_api_key');

if (hasAllClientConfig && !hasPlaceholderApiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    firebaseEnabled = true;
    console.log('✅ Firebase client SDK initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase client SDK disabled due to initialization error:', error.message);
  }
} else {
  console.warn('⚠️ Firebase client SDK disabled: missing or placeholder Firebase env vars');
}

// Admin SDK for token verification
try {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('✅ Firebase Admin SDK initialized successfully');
  } else {
    console.warn('⚠️ Firebase Admin SDK disabled: FIREBASE_PROJECT_ID is missing');
  }
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    console.warn('⚠️ Firebase Admin SDK disabled due to initialization error:', error.message);
  }
}

if (!firebaseEnabled) {
  console.warn('⚠️ Server started without Firebase client features. Auth/Firestore routes may fail until env vars are configured.');
}
console.log(`📦 Firebase project ID: ${process.env.FIREBASE_PROJECT_ID || 'not set'}`);

module.exports = { auth, db, admin, firebaseEnabled };
