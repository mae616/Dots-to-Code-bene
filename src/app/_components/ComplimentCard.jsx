'use client';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
import { mPlus1, mPlus1Bold } from "@/app/_config/themeFontConfig";
import { dayjsConfig } from "@/app/_config/dayjsConfig";
import Link from 'next/link';

export default function ComplimentCard({complimentInfo}) {
  return (
    <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
        <div className="text-left flex flex-col gap-4">
        <div className="flex items-end gap-2">
            <div className="grow">
            <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい人</h5>
            <div className={mPlus1.className}>
              {complimentInfo.to_category} さん
            </div>
            </div>
            <div className="grow-0">
                <h5 className={mPlus1Bold.className + " text-xs"}>投稿者</h5>
                <div className={mPlus1.className}>
                    {complimentInfo.user_name} <span className='text-xs'>さん</span>
                </div>
            </div>
        </div>
        <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい度</h5>
            <RatingButton readOnly={true} ratingValue={complimentInfo.compliment_rating} />
        </div>
        <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>その内容</h5>
            <div className={mPlus1.className}>
            {complimentInfo.body}
            </div>
        </div>
        <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>思ったこと</h5>
            <div className={mPlus1.className}>
            {complimentInfo.thoughts}
            </div>
        </div>
        <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
            {Array.from(complimentInfo.tags).map((tag, index) => {
            return (
                <Chip key={index} label={`#${tag}`} className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
            );
            })}
        </div>
        <div className="mx-auto flex justify-between items-center w-44">
            <LikeButton isLiked={true} countOfLikes={complimentInfo.count_of_likes} />
            <CommentButton countOfComment={complimentInfo.count_of_comments} />
        </div>
        </div>
        <div className="text-right text-sm mt-5 text-slate-500">
        {dayjsConfig(complimentInfo.created_at.toDate()).fromNow()}
        </div>
        <div className="text-right text-sm mt-5 text-sky-500">
          <Link href={`/compliments/${complimentInfo.id}`}>
            詳細へ
          </Link>
        </div>
    </Card>
  );
}