'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getUserInfo, useIsAuth } from "@/app/_states/user";
import { useRef } from "react";

export function useFetchMyLikes() {
  const registeredUser = getUserInfo();
  const isAuth = useIsAuth();
  const myLikesRef = useRef([]);

  const fetchMyLikes = async ({complimentId, complimentIds}) => {
    if(!complimentId && ( !complimentIds || complimentIds.length === 0)){
      myLikesRef.current = [];
      return;
    }

    if (!isAuth) {
      myLikesRef.current = [];
      return;
    }

    let q;
    if (complimentId) {
      q = query(collection(db, "likes"), 
          where("user_id", "==", registeredUser.uid), 
          where("compliment_id", "==", complimentId));
    }else if (complimentIds.length === 1){
      q = query(collection(db, "likes"), 
          where("user_id", "==", registeredUser.uid),
          where("compliment_id", "==", complimentIds[0]));
    }else{
      q = query(collection(db, "likes"), 
          where("user_id", "==", registeredUser.uid),
          where("compliment_id", "in", complimentIds));
    }
    const querySnapshot = await getDocs(q);
    const myLikesTemp = [];
    querySnapshot.forEach(doc => {
      myLikesTemp.push(doc.data().compliment_id);
    });
    myLikesRef.current = myLikesTemp;
  };

  function isLiked(complimentId) {
    return myLikesRef.current.includes(complimentId);
  }
  
  return { isLiked, fetchMyLikes };
}
