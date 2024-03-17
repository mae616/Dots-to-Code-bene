import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { M_PLUS_1 } from  "next/font/google";
import 'dayjs/locale/ja';
import dayjs, { locale, extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
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
        </div>
        <div className="text-right text-sm mt-5 text-slate-500">
        {dayjs().fromNow()}
        </div>
    </Card>
  );
}
