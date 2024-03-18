'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useUserInfo } from "@/app/_states/user";
import { useEffect, useState } from "react";

export function useFetchMyComplimentList() {
  const [registeredUser] = useUserInfo();
  const [myCompliments, setMyCompliments] = useState([]);
  useEffect(() => {
    const fetchMyCompliments = async () => {
      if (!registeredUser.uid) {
        return;
      }

      const myComplimentTemp = [];
      const querySnapshot = await getDocs(
        query(collection(db, "compliments"), 
          where("user_id", "==", registeredUser.uid), 
          orderBy("created_at", "desc")));
      querySnapshot.forEach(doc => {
        myComplimentTemp.push({
          id: doc.id,
          ...doc.data()
        });
        setMyCompliments(myComplimentTemp);
      });
    };
    fetchMyCompliments();
  }, [registeredUser.uid]);
  
  return myCompliments;
}
