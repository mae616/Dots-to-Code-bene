"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/_config/firebase";
import {
  setDoc,
  addDoc,
  doc,
  collection,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { getUserInfo, useIsAuth } from "@/app/_states/user";
import { useFetchMyLikes } from "./useFetchMyLikes";
let unsubscribe = null;
export function useEditMyCompliment(complimentId) {
  const registeredUser = getUserInfo();
  const [id, setId] = useState("");
  const [toName, setToName] = useState("");
  const [toCategory, setToCategory] = useState("");
  const [complimentRating, setComplimentRating] = useState(3);
  const [body, setBody] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  const [countOfLikes, setCountOfLikes] = useState(0);
  const [countOfComments, setCountOfComments] = useState(0);
  const router = useRouter();
  const loadingRef = useRef(false);
  const [isloading, setIsLoading] = useState(false);

  const isAuth = useIsAuth();
  const complimentRef = useRef({});
  const { isLiked, fetchMyLikes } = useFetchMyLikes();

  const fetchCompliment = async () => {
    const q = doc(db, "compliments", complimentId);

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.exists()) {
        fetchMyLikes({ complimentId }).then(() => {
          complimentRef.current = {
            id: complimentId,
            isLiked: isAuth ? isLiked(complimentId) : false,
            ...querySnapshot.data(),
          };
          setId(complimentRef.current.id);
          setToName(complimentRef.current.to_name);
          setToCategory(complimentRef.current.to_category);
          setComplimentRating(complimentRef.current.compliment_rating);
          setBody(complimentRef.current.body);
          setThoughts(complimentRef.current.thoughts);
          setTags(
            complimentRef.current.tags.map((tag) => ({
              id: tag,
              text: tag,
              registered: true,
            }))
          );
          setMessage(complimentRef.current.message);
          setCountOfLikes(complimentRef.current.count_of_likes);
          setCountOfComments(complimentRef.current.count_of_comments);
        });
      } else {
        complimentRef.current = {};
      }
    });
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tags"));

        const tagsTemp = [];
        querySnapshot.forEach((doc) => {
          tagsTemp.push({
            id: doc.id,
            registered: true,
            text: doc.data().text,
          });
        });
        setSuggestions(tagsTemp);
      } catch (error) {
        console.log("Error fetching tags: ", error);
      }
    };
    fetchCompliment();
    fetchTags();
    return () => unsubscribe && unsubscribe();
  }, []);

  const saveCompliment = async () => {
    loadingRef.current = true;
    setIsLoading(loadingRef.current);
    try {
      await setDoc(doc(db, "compliments", id), {
        user_id: registeredUser.uid,
        user_name: registeredUser.displayName,
        to_name: toName,
        to_category: toCategory,
        compliment_rating: complimentRating,
        body: body,
        thoughts: thoughts,
        tags: [...tags.map((tag) => tag.text)],
        message: message,
        count_of_likes: countOfLikes,
        count_of_comments: countOfComments,
        created_at: Timestamp.fromDate(new Date()),
      });

      const registeredTags = tags.filter((tag) => tag.registered === false);
      registeredTags.length > 0 &&
        Promise.all(
          registeredTags.map(async (tag) => {
            return await addDoc(collection(db, "tags"), {
              text: tag.text,
            });
          })
        ).then(() => {
          loadingRef.current = false;
          setIsLoading(loadingRef.current);
          router.push("/mycompliments");
        });

      if (registeredTags.length === 0) {
        loadingRef.current = false;
        setIsLoading(loadingRef.current);
        router.push("/mycompliments");
      }
    } catch (e) {
      loadingRef.current = false;
      setIsLoading(loadingRef.current);
      console.log("Error adding document: ", e);
    }
  };

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
    saveComplimentLoading: loadingRef.current,
  };
}
