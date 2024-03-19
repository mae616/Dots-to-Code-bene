'use client';
import { useState } from "react";
import { useLike } from "@/app/_hook/useLike";

export default function LikeButton({isLiked = false, countOfLikes = 0, complimentId}) {
  const { addLike, removeLike } = useLike();

  if(isLiked){
    return (
        <div className="flex items-center hover:cursor-pointer z-10">
            <i className="pi pi-heart-fill h-[10px] text-pink-400 mr-1" onClick={()=>{ removeLike(complimentId); }} />
            <div className="mt-1.5">{countOfLikes}</div>
        </div>
    );
  }else{
    return (
      <div className="flex items-center hover:cursor-pointer z-10">
        <i className="pi pi-heart h-[10px]  text-pink-400 mr-1" onClick={()=>{ addLike(complimentId); }} />
        <div className="mt-1.5">{countOfLikes}</div>
      </div>
    );
  }
};

