'use client';
import { useEffect, useState, useRef } from "react";
import { db } from "@/app/_config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useIsAuth } from "@/app/_states/user";
import { useFetchMyLikes } from "./useFetchMyLikes";
let unsubscribe;
export function useFetchCompliment({complimentId}) {
  const isAuth = useIsAuth();
  const [compliment, setCompliment] = useState({});
  const complimentRef = useRef({});
  const { isLiked, fetchMyLikes } = useFetchMyLikes();

  const fetchCompliment = async () => {
    const q = doc(db, "compliments" , complimentId);
    
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.exists()) {
        fetchMyLikes({complimentId}).then(
          () => {
            complimentRef.current = {
              id: complimentId,
              isLiked: isAuth ? isLiked(complimentId): false,
              ...querySnapshot.data()
            };
            setCompliment(complimentRef.current);
          }
        );
      }else{
        complimentRef.current = {};
      }
      setCompliment(complimentRef.current);
    });
  };

  useEffect(() => {
    fetchCompliment();
    return ()=> unsubscribe && unsubscribe();
  }, []);

  return {compliment: complimentRef.current};
};
