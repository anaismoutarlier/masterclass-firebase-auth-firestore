import "@/styles/globals.css";
import "sanitize.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";
import { FirebaseContext } from "@/firebase/firebase.context";
import { useEffect, useState } from "react";

const googleAuthProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(data => {
        console.log(data);
        setUser(data);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  const signin = async () => await signInWithPopup(auth, googleAuthProvider);

  const signout = async () => await signOut(auth);

  return (
    <FirebaseContext.Provider value={{ signin, user, signout }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
