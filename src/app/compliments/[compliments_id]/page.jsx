"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/_components/Header";
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
import MessageCard from "@/app/_components/MessageCard";
import VoicePlay from "@/app/_components/VoicePlay";
import CommentList from "@/app/_components/CommentList";
import Tags from "@/app/_components/Tags";
import { mPlus1, mPlus1Bold } from "@/app/_config/themeFontConfig";
import { dayjsConfig } from "@/app/_config/dayjsConfig";
import { useFetchCompliment } from "@/app/_hook/useFetchCompliment";
import { createMessageCard } from "@/app/_utils/CreateMessageCard";

export default function ComplimentCard({ params }) {
  const { compliments_id } = params;
  const { compliment } = useFetchCompliment({ complimentId: compliments_id });
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [messageCardURL, setMessageCardURL] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const create = async () => {
      const messageBody = compliment.message;
      const pngURI = await createMessageCard(
        messageBody,
        "",
        compliment.message_card_type
      );
      setMessageCardURL(pngURI);
    };
    if (compliment.message) {
      create();
    }
  }, [compliment]);

  return (
    <>
      {isClient && (
        <>
          <Header />
          <BreadCrumb
            model={[{ label: "投稿詳細" }]}
            home={{
              icon: (
                <FontAwesomeIcon
                  icon={faUsers}
                  className="h-[10px] text-slate-500 mr-1"
                />
              ),
              label: "みんなの投稿",
              url: "/compliments",
            }}
            className="flex text-sm bg-transparent border-none"
          />
          <div className="text-center mx-5">
            {compliment.id ? (
              <>
                <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
                  <div className="text-left flex flex-col gap-4">
                    <div className="flex items-end gap-2">
                      <div className="grow">
                        <h5 className={mPlus1Bold.className + " text-xs"}>
                          ほめたい人
                        </h5>
                        <div className={mPlus1.className}>
                          {compliment.to_category} さん
                        </div>
                      </div>
                      <div className="grow-0">
                        <h5 className={mPlus1Bold.className + " text-xs"}>
                          投稿者
                        </h5>
                        <div className={mPlus1.className}>
                          {compliment.user_name}{" "}
                          <span className="text-xs">さん</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className={mPlus1Bold.className + " text-xs"}>
                        ほめたい度
                      </h5>
                      <RatingButton
                        readOnly={true}
                        ratingValue={compliment.compliment_rating}
                      />
                    </div>
                    <div>
                      <h5 className={mPlus1Bold.className + " text-xs"}>
                        その内容
                      </h5>
                      <div className={mPlus1.className}>{compliment.body}</div>
                    </div>
                    <div>
                      <h5 className={mPlus1Bold.className + " text-xs"}>
                        思ったこと
                      </h5>
                      <div className={mPlus1.className}>
                        {compliment.thoughts}
                      </div>
                    </div>
                    <Tags readonly={true} tags={compliment.tags} />
                    <div className="mx-auto flex justify-between items-center w-44">
                      <LikeButton
                        isLiked={compliment.isLiked}
                        countOfLikes={compliment.count_of_likes}
                        complimentId={compliment.id}
                      />
                      <CommentButton
                        countOfComment={compliment.count_of_comments}
                        complimentRoute={pathname}
                      />
                    </div>

                    <MessageCard
                      readOnly={true}
                      messageCardURL={messageCardURL}
                    />
                    <div>
                      <VoicePlay messageBody={compliment.message} toName="" />
                    </div>
                  </div>
                  <div className="text-right text-sm mt-5 text-slate-500">
                    <span suppressHydrationWarning={true}>
                      {dayjsConfig(compliment.created_at.toDate()).fromNow()}
                    </span>
                  </div>
                </Card>
                <CommentList
                  countOfComment={compliment.count_of_comments}
                  complimentId={compliment.id}
                  complimentAuthorId={compliment.user_id}
                />
              </>
            ) : (
              <Skeleton className="w-full" height="540px" />
            )}
          </div>
          <div className="text-right p-1 mr-2 pb-2 text-slate-600">
            <Link href={pathname} className="text-sm hover:cursor-pointer">
              <i className="pi pi-angle-up" />
              トップへ
            </Link>
          </div>
        </>
      )}
    </>
  );
}
