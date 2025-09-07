// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOzgLLNUePv4Q6MLFHKpUXeumMxeAW9ME",
  authDomain: "dodo-finance.firebaseapp.com",
  projectId: "dodo-finance",
  storageBucket: "dodo-finance.firebasestorage.app",
  messagingSenderId: "89699744171",
  appId: "1:89699744171:web:6166e8213495170409baee",
  measurementId: "G-7GFHDGFD4X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Login function
export const googleLogin = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    
    return result
  } catch (error) {
    console.error(error);
  }
};