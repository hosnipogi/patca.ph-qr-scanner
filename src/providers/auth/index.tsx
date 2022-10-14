import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutGoogle,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "config/firebase";
import { FirebaseError } from "firebase/app";
import clearAllCookies from "utils/clearAllCookies";

type Props = {
  children: React.ReactNode;
};

type UserType = { name: string; email: string } | null;
interface IUserValues {
  user: UserType;
  authIsLoading: boolean;
  isLoggedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const googleAuthProvider = new GoogleAuthProvider();

export const UserContext = createContext<IUserValues>({} as IUserValues);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType>(null);
  const [authIsLoading, setAuthIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user?.email);
      if (user && user.displayName && user.email) {
        setIsLoggedIn(true);
        setUser({ name: user.displayName, email: user.email });
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log("trying", auth);
      setAuthIsLoading(true);
      await signInWithPopup(auth, googleAuthProvider);

      setAuthIsLoading(false);
    } catch (e) {
      setAuthIsLoading(false);
      if (e instanceof FirebaseError) {
      }
    }
  };

  const signOut = async () => {
    await signOutGoogle(auth);
    setUser(null);
    clearAllCookies();
  };

  const userValues = {
    authIsLoading,
    signInWithGoogle,
    signOut,
    user,
    isLoggedIn,
    setUser,
  };

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
