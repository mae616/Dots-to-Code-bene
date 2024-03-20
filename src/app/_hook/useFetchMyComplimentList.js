'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useUserInfo, useIsAuth } from "@/app/_states/user";
import { useEffect, useState, useRef } from "react";
import { useFetchMyLikes } from "./useFetchMyLikes";
let unsubscribe;
export function useFetchMyComplimentList() {
  const [registeredUser] = useUserInfo();
  const isAuth = useIsAuth();
  const myComplimentsRef = useRef([]);
  const myComplimentIdsRef = useRef([]);
  const { isLiked, fetchMyLikes } = useFetchMyLikes();
  const [myCompliments, setMyCompliments] = useState([]);

  const fetchMyCompliments = async () => {
    if (!isAuth) {
      return;
    }

    try{
      const q = query(collection(db, "compliments"), 
          where("user_id", "==", registeredUser.uid), 
          orderBy("created_at", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const myComplimentIdsTemp = [];
        querySnapshot.forEach(doc => {
          myComplimentIdsTemp.push(doc.id);
        });
        myComplimentIdsRef.current = myComplimentIdsTemp;
        fetchMyLikes({complimentIds: myComplimentIdsTemp}).then(
          () => {
            const myComplimentTemp = [];
            querySnapshot.forEach(doc => {
              myComplimentTemp.push({
                id: doc.id,
                isLiked: isLiked(doc.id),
                ...doc.data()
              });
            });
            myComplimentsRef.current = myComplimentTemp;
            setMyCompliments(myComplimentTemp);
          }
        );
      });

    } catch (error) {
      console.error("Error fetching compliments: ", error);
    }
  };

  useEffect(() => {
    if (isAuth){
      fetchMyCompliments();
    }
    return ()=> unsubscribe && unsubscribe();
  }, [isAuth]);
  
  return {myCompliments: myComplimentsRef.current};
}
