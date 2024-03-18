import AvatarIcon from './AvatarIcon';
import { M_PLUS_1 } from  "next/font/google";
import 'dayjs/locale/ja';
import dayjs, { locale, extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

locale('ja');
extend(relativeTime);

const mPlus1 = M_PLUS_1({
    weight: "400",
    subsets: ["latin"],
});

export default function OwnCommentCard({}) {

    return (
      <div className="flex flex-row-reverse items-start gap-4">
        <AvatarIcon name="主さん" />
        <div className="w-10/12 bg-pink-200 bg-opacity-40 shadow-none rounded-md p-2.5">
          <div className={ mPlus1.className + " relative text-left text-sm break-all"
            + " before:content-[''] before:w-[10px] before:h-[16px] before:clip-triangle before:bg-pink-200 before:bg-opacity-40"
            + " before:absolute before:right-[-10px] before:-mx-2.5 before:top-0.5"}>
            {"コメントですaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
           </div>
           <div className="text-right text-[0.8em] mt-5 text-slate-500">
            {dayjs().fromNow()}
          </div>
        </div>
      </div>
    );
};
