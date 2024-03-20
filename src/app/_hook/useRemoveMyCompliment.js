"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/_config/firebase";
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

export function useRemoveMyCompliment(compliment_id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const removeCompliment = async () => {
    if (!compliment_id) {
      setError("compliment_id is required");
      return;
    }

    setLoading(true);

    try {
      await deleteDoc(doc(db, "compliments", compliment_id));

      const Likes = await getDocs(
        query(
          collection(db, "likes"),
          where("compliment_id", "==", compliment_id)
        )
      );
      Likes.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const Comments = await getDocs(
        query(
          collection(db, "comments"),
          where("compliment_id", "==", compliment_id)
        )
      );
      Comments.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setLoading(false);
      router.push("/mycompliments");
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return {
    removeCompliment,
    removeLoading: loading,
    removeError: error,
    setRemoveError: setError,
  };
}
