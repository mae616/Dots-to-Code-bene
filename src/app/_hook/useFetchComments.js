'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useUserInfo } from "@/app/_states/user";

export function useFetchComments(complimentId, complimentAuthorId) {
  const commentsRef = useRef([]);
  const [comments, setComments] = useState([]);
  const [registeredUser] = useUserInfo();

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!complimentId || !complimentAuthorId) {
        return;
      }

      const q = query(collection(db, "comments"), 
            where("compliment_id", "==", complimentId),
            orderBy("created_at", "asc"));

      onSnapshot(q, (querySnapshot) => {
        const commentsTemp = [];
        querySnapshot.forEach(doc => {
          commentsTemp.push({
            id: doc.id,
            isAuthorComment: doc.data().user_id === complimentAuthorId,
            isOwn: doc.data().user_id === registeredUser.uid,
            ...doc.data()
          });
        });
        commentsRef.current = commentsTemp;
        setComments(commentsRef.current);
      });
    };
    fetchMyComments();

  }, []);
  
  return { comments: commentsRef.current };
}
