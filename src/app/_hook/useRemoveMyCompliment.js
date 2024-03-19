'use client';
import { useRouter } from "next/navigation";
import { db } from "@/app/_config/firebase";
import { deleteDoc, doc } from "firebase/firestore"; 

export function useRemoveMyCompliment(compliment_id) {
    const router = useRouter();

    const removeCompliment = async () => {
        if (!compliment_id) {
          return;
        }

        try {
          await deleteDoc(doc(db, "compliments", compliment_id));
          
          router.push("/mycompliments")
        } catch (e) {
          console.error("Error removing document: ", e);
        }
      }

      return removeCompliment;
};
