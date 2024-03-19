'use client';
import { useEffect, useState } from "react";
import { db } from "@/app/_config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useFetchMyLikes } from "./useFetchMyLikes";

export function useFetchCompliment(complimentsId) {
    const [compliment, setCompliment] = useState({});
    const { isLiked } = useFetchMyLikes();

    useEffect(() => {
      const fetchCompliment = async () => {
        const q = doc(db, "compliments" , complimentsId);
        
        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.exists()) {
            setCompliment({
              id: complimentsId,
              isLiked: isLiked(complimentsId),
              ...querySnapshot.data()
            });
          }
        });
      };
      fetchCompliment();
    }, []);

    return compliment;
};
