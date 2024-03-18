'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/_states/user";

export function useRedirectNoAuth() {
  const [registeredUser] = useUserInfo();
  const router = useRouter();
  useEffect(() => {
    if (!registeredUser.uid) {
      router.push("/login");
    }
  }, [registeredUser]);
}
