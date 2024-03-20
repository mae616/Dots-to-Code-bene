'use client';
import { db } from "@/app/_config/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { getUserInfo, useIsAuth } from "@/app/_states/user";
import { useEffect, useState, useRef } from "react";
import { useFetchMyLikes } from "./useFetchMyLikes";
let unsubscribe = null;
export function useFetchMyComplimentList() {
  const registeredUser = getUserInfo();
  const isAuth = useIsAuth();
  const myComplimentsRef = useRef([]);
  const myComplimentIdsRef = useRef([]);
  const { isLiked, fetchMyLikes } = useFetchMyLikes();
  const [myCompliments, setMyCompliments] = useState([]);
  const loading = useRef(true);

  const fetchMyCompliments = async () => {
    try{
      const q = query(collection(db, "compliments"), 
          where("user_id", "==", registeredUser.uid), 
          orderBy("created_at", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        loading.current = true;
        if(querySnapshot.empty || querySnapshot.docs.length === 0){
          myComplimentsRef.current = [];
          loading.current = false;
          setMyCompliments([]);
          return;
        }

        const myComplimentIdsTemp = [];
        querySnapshot.forEach(doc => {
          myComplimentIdsTemp.push(doc.id);
        });
        myComplimentIdsRef.current = myComplimentIdsTemp;

        if(myComplimentIdsRef.current.length > 0){
          fetchMyLikes({complimentIds: myComplimentIdsRef.current }).then(
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
              loading.current = false;
              setMyCompliments(myComplimentTemp);
            }
          );
        }else{
          myComplimentsRef.current = [];
          loading.current = false;
          setMyCompliments([]);
        }
      });

    } catch (error) {
      myComplimentsRef.current = [];
      loading.current = false;
      console.error("Error fetching compliments: ", error);
    }
  };

  useEffect(() => {
    loading.current = true;

    if (isAuth) {
      unsubscribe = null;
      fetchMyCompliments();
    }else{
      loading.current = false;
      myComplimentsRef.current = [];
      setMyCompliments([]);
    }

    return ()=> isAuth && unsubscribe && unsubscribe();
  }, [isAuth]);
  
  return {myCompliments: myComplimentsRef.current, loading: loading.current};
}
