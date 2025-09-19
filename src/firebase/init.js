import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYsBs3Ylspn6rcAuG9apccnbuMXd1nffg",
  authDomain: "week7-amita.firebaseapp.com",
  projectId: "week7-amita",
  storageBucket: "week7-amita.firebasestorage.app",
  messagingSenderId: "957263373287",
  appId: "1:957263373287:web:88b76002da474a5a981342"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()
export default db
