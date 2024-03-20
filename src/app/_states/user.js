"use client";
import { useEffect } from "react";
import { auth } from "@/app/_config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "some-persist-state",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

const userInfoAtom = atom({
  key: "userInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const isSignUpOrLoginAtom = atom({
  key: "isSignUpOrLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const useIsSignUpOrLogIn = () => {
  const [isSignUpOrLogIn, setIsSignUpOrLogIn] =
    useRecoilState(isSignUpOrLoginAtom);
  return { isSignUpOrLogIn, setIsSignUpOrLogIn };
};

let unsubscribe = null;
export const useUserInfo = (argIsStart) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const { isSignUpOrLogIn, setIsSignUpOrLogIn } = useIsSignUpOrLogIn();

  const signUpOrLogIn = async () => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSignUpOrLogIn) {
        setUserInfo(user);
      } else if (!user && isSignUpOrLogIn) {
        setUserInfo({});
        unsubscribe();
      }
    });
  };

  useEffect(() => {
    if (isSignUpOrLogIn) {
      unsubscribe = null;
      signUpOrLogIn();
    }

    return () => {
      if (isSignUpOrLogIn) {
        setIsSignUpOrLogIn(false);
      }
    };
  }, [isSignUpOrLogIn]);

  return { userInfo, setUserInfo, setIsSignUpOrLogIn };
};

export const getUserInfo = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  return userInfo;
};

export const useIsAuth = () => {
  const userInfo = getUserInfo();
  return userInfo.uid ? true : false;
};
