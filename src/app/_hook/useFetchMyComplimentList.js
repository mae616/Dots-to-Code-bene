'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useUserInfo } from "@/app/_states/user";
import { useEffect, useState } from "react";
import { useFetchMyLikes } from "./useFetchMyLikes";

export function useFetchMyComplimentList() {
  const [registeredUser] = useUserInfo();
  const [myCompliments, setMyCompliments] = useState([]);
  const { isLiked } = useFetchMyLikes();

  useEffect(() => {
    const fetchMyCompliments = async () => {
      if (!registeredUser.uid) {
        return;
      }

      const myComplimentTemp = [];

      let q;
      try{
        q = query(collection(db, "compliments"), 
            where("user_id", "==", registeredUser.uid), 
            orderBy("created_at", "desc"));
      } catch (e) {
        // 応急処置
        q = query(collection(db, "compliments"), 
            where("user_id", "==", registeredUser.uid), 
            orderBy("created_at", "desc"));
      }

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(doc => {
          myComplimentTemp.push({
            id: doc.id,
            isLiked: isLiked(doc.id),
            ...doc.data()
          });
          setMyCompliments(myComplimentTemp);
        });
      });
    };
    fetchMyCompliments();
  }, [registeredUser.uid]);
  
  return myCompliments;
}
