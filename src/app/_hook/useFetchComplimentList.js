'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useUserInfo } from "@/app/_states/user";
import { useEffect, useState } from "react";

export function useFetchComplimentList() {
  const [registeredUser] = useUserInfo();
  const [compliments, setCompliments] = useState([]);
  useEffect(() => {
    const fetchCompliments = async () => {
      if (!registeredUser.uid) {
        return;
      }

      const complimentTemp = [];
      const querySnapshot = await getDocs(
        query(collection(db, "compliments"), 
          orderBy("created_at", "desc")));
      querySnapshot.forEach(doc => {
        complimentTemp.push({
          id: doc.id,
          ...doc.data()
        });
        setCompliments(complimentTemp);
      });
    };
    fetchCompliments();
  }, [registeredUser.uid]);
  
  return compliments;
}
