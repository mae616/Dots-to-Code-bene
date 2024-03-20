"use client";
import { useRef, useState } from "react";
import { getUserInfo } from "@/app/_states/user";

export function useLike() {
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const registeredUser = getUserInfo();

  const addLike = async (complimentId) => {
    isLoadingRef.current = true;
    setIsLoading(isLoadingRef.current);
    try {
      const data = {
        user_id: registeredUser.uid,
        compliment_id: complimentId,
      };

      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      isLoadingRef.current = false;
      setIsLoading(isLoadingRef.current);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const removeLike = async (complimentId) => {
    isLoadingRef.current = true;
    setIsLoading(isLoadingRef.current);
    try {
      const data = {
        user_id: registeredUser.uid,
        compliment_id: complimentId,
      };
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      isLoadingRef.current = false;
      setIsLoading(isLoadingRef.current);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  return {
    isLoading: isLoadingRef.current,
    addLike,
    removeLike,
  };
}
