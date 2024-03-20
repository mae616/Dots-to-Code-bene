"use client";
import { useLike } from "@/app/_hook/useLike";
import LoadingAnimation from "./LoadingAnimation";
import { useIsAuth } from "@/app/_states/user";

export default function LikeButton({
  isLiked = false,
  countOfLikes = 0,
  complimentId,
}) {
  const { addLike, removeLike, isLoading } = useLike();
  const isAuth = useIsAuth();

  if (isLiked) {
    return (
      <>
        <div
          className="flex items-center hover:cursor-pointer px-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            isAuth && removeLike(complimentId);
          }}
        >
          <i className="pi pi-heart-fill h-[10px] text-pink-400 mr-1" />
          <div className="mt-1.5">{countOfLikes}</div>
        </div>
        <LoadingAnimation loading={isLoading} />
      </>
    );
  } else {
    return (
      <>
        <div
          className="flex items-center hover:cursor-pointer px-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            addLike(complimentId);
          }}
        >
          <i className="pi pi-heart h-[10px]  text-pink-400 mr-1" />
          <div className="mt-1.5">{countOfLikes}</div>
        </div>
        {isAuth && <LoadingAnimation loading={isLoading} />}
      </>
    );
  }
}
