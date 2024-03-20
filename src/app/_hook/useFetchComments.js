'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { getUserInfo, useIsAuth } from "@/app/_states/user";
let unsubscribe;
export function useFetchComments(complimentId, complimentAuthorId) {
  const commentsRef = useRef([]);
  const [comments, setComments] = useState([]);
  const registeredUser = getUserInfo();
  const isAuth = useIsAuth();

  const fetchMyComments = async () => {
    if (!complimentId || !complimentAuthorId) {
      return;
    }

    const q = query(collection(db, "comments"), 
          where("compliment_id", "==", complimentId),
          orderBy("created_at", "asc"));

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsTemp = [];
      querySnapshot.forEach(doc => {
        commentsTemp.push({
          id: doc.id,
          isAuthorComment: doc.data().user_id === complimentAuthorId,
          isOwn: isAuth ? doc.data().user_id === registeredUser.uid: false,
          ...doc.data()
        });
      });
      commentsRef.current = commentsTemp;
      setComments(commentsTemp);
    });
  };

  useEffect(() => {
    fetchMyComments();
    return ()=> unsubscribe && unsubscribe();
  }, []);
  
  return { comments: commentsRef.current };
}
