'use client';
import { getUserInfo } from "@/app/_states/user";

export function useComments(countOfComment) {
  const registeredUser = getUserInfo();

    const postComment = async (complimentId, body) => {
        try {
          const data = {
            user_id: registeredUser.uid,
            user_name: registeredUser.displayName,
            compliment_id: complimentId,
            body: body,
          };

          await fetch("/api/comment", {method: "POST", body: JSON.stringify(data) , headers: { "Content-Type": "application/json" }});
        } catch (e) {
          console.error("Error adding comments: ", e);
        }
      }

      const removeComment = async (commentId, complimentId) => {
        try {
          const data = {
            comment_id: commentId,
            compliment_id: complimentId
          };
          await fetch("/api/comment", {method: "DELETE", body: JSON.stringify(data), headers: { "Content-Type": "application/json" }});
        } catch (e) {
          console.error("Error delete comments: ", e);
        }
      }

      return {
        postComment,
        removeComment
      };
};
