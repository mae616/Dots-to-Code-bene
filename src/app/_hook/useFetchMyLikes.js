'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUserInfo } from "@/app/_states/user";
import { useEffect, useRef } from "react";

export function useFetchMyLikes(complimentId = "") {
  const [registeredUser] = useUserInfo();
  const myLikesRef = useRef([]);
  useEffect(() => {
    const fetchMyLikes = async () => {
      if (!registeredUser.uid) {
        return;
      }

      let q;
      if (complimentId) {
        q = query(collection(db, "likes"), 
            where("user_id", "==", registeredUser.uid), 
            where("compliment_id", "==", complimentId));
      }else{
        q = query(collection(db, "likes"), 
            where("user_id", "==", registeredUser.uid));
      }
      onSnapshot(q, (querySnapshot) => {
        const myLikesTemp = [];
        querySnapshot.forEach(doc => {
          myLikesTemp.push(doc.data().compliment_id);
        });
        myLikesRef.current = myLikesTemp;
      });
    };
    fetchMyLikes();

  }, [registeredUser.uid]);

  function isLiked(complimentId) {
    return myLikesRef.current.includes(complimentId);
  }
  
  return { isLiked };
}
