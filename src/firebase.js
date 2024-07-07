// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextgram-fc222.firebaseapp.com",
  projectId: "nextgram-fc222",
  storageBucket: "nextgram-fc222.appspot.com",
  messagingSenderId: "299417484496",
  appId: "1:299417484496:web:9676bd7ed9a09e43b972d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//          request.resource.size < 2 * 1024 * 1024 &&
//          request.resource.contentType.matches('image/.*');
//       }
//     }
//   }
