'use client';
import { useUserInfo } from "@/app/_states/user";

export function useLike() {
    const [registeredUser] = useUserInfo();

    const addLike = async (complimentId) => {
        try {
          const data = {
            user_id: registeredUser.uid,
            compliment_id: complimentId,
          };

          await fetch("/api/like", {method: "POST", body: JSON.stringify(data) , headers: { "Content-Type": "application/json" }});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }

      const removeLike = async (complimentId) => {
        try {
          const data = {
            user_id: registeredUser.uid,
            compliment_id: complimentId,
          };
          await fetch("/api/like", {method: "DELETE", body: JSON.stringify(data), headers: { "Content-Type": "application/json" }});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }

      return {
        addLike,
        removeLike
      };
};
