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

export default function CommentCard({}) {

    return (
      <div className="flex items-start gap-4">
        <AvatarIcon name="しおりさん" className="mt-10" />
        <div className="w-10/12 bg-sky-200 bg-opacity-40 shadow-none rounded-md p-2.5">
          <div className={ mPlus1.className + " relative text-left text-sm break-all"
            + " before:content-[''] before:w-[10px] before:h-[16px] before:clip-triangle before:bg-sky-200 before:bg-opacity-40"
            + " before:absolute before:left-[-10px] before:-mx-2.5 before:top-0.5"
            + " before:rotate-180"}>
            {"コメントです"}
           </div>
           <div className="text-right text-[0.8em] mt-5 text-slate-500">
            {dayjs().fromNow()}
          </div>
        </div>
      </div>
    );
};
