'use client';
import { useState } from "react";
import { useLike } from "@/app/_hook/useLike";

export default function LikeButton({isLiked = false, countOfLikes = 0, complimentId}) {
  const [liked, setLiked] = useState(isLiked);
  const { addLike, removeLike } = useLike();

  const countOfLiked = isLiked ? countOfLikes : countOfLikes + 1;

  if(liked){
    return (
        <div className="flex items-center">
            <i className="pi pi-heart-fill h-[10px] text-pink-400 mr-1" onClick={()=>{ removeLike(complimentId); setLiked(!liked);}} />
            <div className="mt-1.5">{countOfLiked}</div>
        </div>
    );
  }else{
    return (
      <div className="flex items-center">
        <i className="pi pi-heart h-[10px]  text-pink-400 mr-1" onClick={()=>{ addLike(complimentId); setLiked(!liked);}} />
        <div className="mt-1.5">{countOfLiked-1}</div>
      </div>
    );
  }
};

