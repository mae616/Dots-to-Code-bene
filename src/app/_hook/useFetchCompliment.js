'use client';
import { useEffect, useState } from "react";
import { db } from "@/app/_config/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useFetchCompliment(complimentsId) {
    const [compliment, setCompliment] = useState({});

    useEffect(() => {
      const fetchCompliment = async () => {
        const querySnapshot = await getDoc(doc(db, "compliments" , complimentsId));
        if (querySnapshot.exists()) {
          setCompliment({
            id: complimentsId,
            ...querySnapshot.data()
          });
        }
      };
      fetchCompliment();
    }, []);

    return compliment;
};
