'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/_config/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { useUserInfo } from "@/app/_states/user";

export function usePostMyCompliment() {
    const [registeredUser] = useUserInfo();
    const [toName, setToName] = useState("");
    const [toCategory, setToCategory] = useState("");
    const [complimentRating, setComplimentRating] = useState(3);
    const [body, setBody] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const saveCompliment = async () => {
        try {
          await addDoc(collection(db, "compliments"), 
          {
            user_id: registeredUser.uid,
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
          router.push("/mycompliments")
        } catch (e) {
          console.error("Error adding document: ", e);
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
        message,
        setMessage,
        saveCompliment
      };
};
