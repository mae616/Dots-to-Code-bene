'use client';
import { useState } from 'react';
import { useLike } from "@/app/_hook/useLike";

export default function LikeButton({isLiked = false, countOfLikes = 0, complimentId}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [countOfLikesState, setCountOfLikesState ] = useState(countOfLikes);
  const { addLike, removeLike } = useLike();

  if(isLikedState){
    return (
        <div className="flex items-center hover:cursor-pointer px-2 z-10" onClick={(e)=>{ e.preventDefault(); setIsLikedState((like) => !like); setCountOfLikesState((count)=>count-1);removeLike(complimentId); }} >
            <i className="pi pi-heart-fill h-[10px] text-pink-400 mr-1" />
            <div className="mt-1.5">{countOfLikesState}</div>
        </div>
    );
  }else{
    return (
      <div className="flex items-center hover:cursor-pointer px-2 z-10" onClick={(e)=>{ e.preventDefault(); setIsLikedState((like) => !like);  setCountOfLikesState((count)=>count+1); addLike(complimentId); }} >
        <i className="pi pi-heart h-[10px]  text-pink-400 mr-1" />
        <div className="mt-1.5">{countOfLikesState}</div>
      </div>
    );
  }
};

