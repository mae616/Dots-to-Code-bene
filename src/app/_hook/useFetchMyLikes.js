'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
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

      let querySnapshot;
      if (complimentId) {
        querySnapshot = await getDocs(
          query(collection(db, "likes"), 
            where("user_id", "==", registeredUser.uid), 
            where("compliment_id", "==", complimentId)));
      }else{
        querySnapshot = await getDocs(
          query(collection(db, "likes"), 
            where("user_id", "==", registeredUser.uid)));
      }
      const myLikesTemp = [];
      querySnapshot.forEach(doc => {
        myLikesTemp.push(doc.data().compliment_id);
      });
      myLikesRef.current = myLikesTemp;
    };
    fetchMyLikes();

  }, [registeredUser.uid]);

  function isLiked(complimentId) {
    return myLikesRef.current.includes(complimentId);
  }
  
  return { isLiked };
}
