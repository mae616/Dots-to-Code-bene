'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getUserInfo, useIsAuth } from "@/app/_states/user";
import { useEffect, useState, useRef } from "react";
import { useFetchMyLikes } from "./useFetchMyLikes";
let unsubscribe;
export function useFetchComplimentList() {
  const registeredUser = getUserInfo();
  const isAuth = useIsAuth();
  const complimentsRef = useRef([]);
  const complimentIdsRef = useRef([]);
  const { isLiked, fetchMyLikes } = useFetchMyLikes();
  const [compliments, setCompliments] = useState([]);

  const fetchCompliments = async () => {
    try{
      const q = query(collection(db, "compliments"), 
          orderBy("created_at", "desc"));
      
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const complimentIdsTemp =[];
        querySnapshot.forEach(doc => {
          complimentIdsTemp.push(doc.id);
        });
        complimentIdsRef.current = complimentIdsTemp;
        fetchMyLikes({complimentIds: complimentIdsTemp}).then(
          () => {
            const complimentTemp = [];
            querySnapshot.forEach(doc => {
              complimentTemp.push({
                id: doc.id,
                isLiked: isAuth ? isLiked(doc.id): false,
                ...doc.data()
              });
            });
            complimentsRef.current = complimentTemp;
            setCompliments(complimentTemp);
          }
        );
      });
    }catch (error) {
      console.error("Error fetching compliments: ", error);
    }
  }

  useEffect(() => {
    fetchCompliments();
    return ()=> unsubscribe && unsubscribe();
  }, []);
  
  return {compliments: complimentsRef.current};
}
