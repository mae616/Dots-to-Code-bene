'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useUserInfo } from "@/app/_states/user";
import { useEffect, useState } from "react";
import { useFetchMyLikes } from "./useFetchMyLikes";

export function useFetchComplimentList() {
  const [registeredUser] = useUserInfo();
  const [compliments, setCompliments] = useState([]);
  const { isLiked } = useFetchMyLikes();

  useEffect(() => {
    const fetchCompliments = async () => {
      if (!registeredUser.uid) {
        return;
      }

      const q = query(collection(db, "compliments"), 
          orderBy("created_at", "desc"));
      
      onSnapshot(q, (querySnapshot) => {
        const complimentTemp = [];
        querySnapshot.forEach(doc => {
          complimentTemp.push({
            id: doc.id,
            isLiked: isLiked(doc.id),
            ...doc.data()
          });
          setCompliments(complimentTemp);
        });
      });
    };
    fetchCompliments();query
  }, [registeredUser.uid]);
  
  return compliments;
}
