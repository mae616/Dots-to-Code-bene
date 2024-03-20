'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/_config/firebase";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"; 
import { getUserInfo } from "@/app/_states/user";

export function usePostMyCompliment() {
    const registeredUser = getUserInfo();
    const [toName, setToName] = useState("");
    const [toCategory, setToCategory] = useState("");
    const [complimentRating, setComplimentRating] = useState(3);
    const [body, setBody] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const loadingRef = useRef(false);
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchTags = async () => {
        try{
          const querySnapshot = await getDocs(collection(db, "tags"));

          const tagsTemp = [];
          querySnapshot.forEach((doc) => {
            tagsTemp.push({
                id: doc.id,
                registered: true,
                text: doc.data().text
            });
          });
          setSuggestions(tagsTemp);
        } catch (error) {
          console.log("Error fetching tags: ", error);
        }
      };
      fetchTags();
    }, []);

    const saveCompliment = async () => {
        loadingRef.current = true;
        setIsLoading(loadingRef.current);
        try {
          await addDoc(collection(db, "compliments"), 
          {
            user_id: registeredUser.uid,
            user_name: registeredUser.displayName,
            to_name: toName,
            to_category: toCategory,
            compliment_rating: complimentRating,
            body: body,
            thoughts: thoughts,
            tags: [...tags.map(tag => tag.text)],
            message: message,
            count_of_likes: 0,
            count_of_comments: 0,
            created_at: Timestamp.fromDate(new Date()), 
          });

          const registeredTags = tags.filter((tag)=>tag.registered === false); 
          registeredTags.length >0 && Promise.all(registeredTags.map(async tag => {
            return await addDoc(collection(db, "tags"), {
              text: tag.text
            });
          })).then(() => { 
            loadingRef.current = false; 
            setIsLoading(loadingRef.current);
            router.push("/mycompliments");
          });

          if(registeredTags.length === 0){
            loadingRef.current = false; 
            setIsLoading(loadingRef.current);
            router.push("/mycompliments");
          }
          
        } catch (e) {
          loadingRef.current = false; 
          setIsLoading(loadingRef.current);
          console.log("Error adding document: ", e);
        }
      }

      return {
        toName,
        setToName,
        toCategory,
        setToCategory,
        complimentRating,
        setComplimentRating,
        body,
        setBody,
        thoughts,
        setThoughts,
        tags,
        setTags,
        suggestions,
        message,
        setMessage,
        saveCompliment,
        saveComplimentLoading: loadingRef.current
      };
};
