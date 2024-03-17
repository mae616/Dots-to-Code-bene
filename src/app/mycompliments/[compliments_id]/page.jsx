import Image from "next/image";
import Link from "next/link";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { M_PLUS_1 } from  "next/font/google";
import 'dayjs/locale/ja';
import dayjs, { locale, extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Header from "@/app/_components/Header";
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
import MessageCard from "@/app/_components/MessageCard";
import VoicePlay from "@/app/_components/VoicePlay";
import CommentList from "@/app/_components/CommentList";
locale('ja');
extend(relativeTime);

const mPlus1 = M_PLUS_1({
  weight: "400",
  subsets: ["latin"],

});

const mPlus1Bold = M_PLUS_1({
  weight: "800",
  subsets: ["latin"],

});

export default function MyComplimentCard() {
  return (
    <>
      <Header />
      <BreadCrumb model={[{label: '投稿詳細'}]} home={{
        icon:<FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />,
        label: '自分の投稿',
        url: '/mycompliments'
    }} className="flex text-sm bg-transparent border-none"/>
      <div className="text-center mx-5">

        <div className="flex justify-end items-center text-sm text-red-400">
        <i className="pi pi-trash text-red-400 pr-1" />削除
        </div>
        <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
          <div className="text-left flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <div className="grow">
                <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい人の名前</h5>
                <div className={mPlus1.className}>
                  {"なおちゃん"}
                </div>
              </div>
              <div className="grow-0">
                <div className={mPlus1.className}>
                  {"娘"}
                </div>
              </div>
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい度</h5>
              <RatingButton ratingValue={3} />
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>その内容</h5>
              <div className={mPlus1.className}>
                {"なおちゃんはいつも笑顔で、みんなを元気にしてくれる。"}
              </div>
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>思ったこと</h5>
              <div className={mPlus1.className}>
                {"なおちゃんはいつも笑顔で、みんなを元気にしてくれる。"}
              </div>
            </div>
            <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
              <Chip label="#がんばりをほめたい" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
              <Chip label="#Comedy" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
              <Chip label="#Mystery" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
            </div>
            <div className="mx-auto flex justify-between items-center w-44">
              <LikeButton isLiked={true} countOfLikes={3} />
              <CommentButton countOfLikes={8} />
            </div>

            <MessageCard />
            <div>
              <VoicePlay />
            </div>
          </div>
          <div className="text-right text-sm mt-5 text-slate-500">
            {dayjs().fromNow()}
          </div>
        </Card>

        <CommentList />
      </div>
      <div className="text-right p-1 mr-2 pb-2">
        <Link href="/mycompliments" className="text-sm hover:cursor-pointer">戻る</Link>
      </div>
    </>
  );
}
