'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsAuth } from "@/app/_states/user";

export function useRedirectNoAuth() {
  const isAuth = useIsAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!isAuth) {
      router.push('/login');
    }
  }, []);
};
