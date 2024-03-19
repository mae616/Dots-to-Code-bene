'use client';
import { useRouter } from "next/navigation";
import { useIsAuth } from "@/app/_states/user";

export function useRedirectNoAuth() {
  const isAuth = useIsAuth();
  const router = useRouter();

  if(!isAuth) {
    router.push('/login');
  }
  return;
};
