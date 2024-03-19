import AvatarIcon from './AvatarIcon';
import { mPlus1 } from "@/app/_config/themeFontConfig";
import { dayjsConfig } from "@/app/_config/dayjsConfig";
import RemoveMyCommentButton from './RemoveMyCommentButton';

export default function OwnCommentCard({comment, removeComment}) {

    return (
      <>
        <div className="flex flex-row-reverse items-start gap-4">
          <AvatarIcon name={comment.user_name} />
          <div className="w-10/12 bg-pink-200 bg-opacity-40 shadow-none rounded-md p-2.5">
            <div className={ mPlus1.className + " relative text-left text-sm break-all"
              + " before:content-[''] before:w-[10px] before:h-[16px] before:clip-triangle before:bg-pink-200 before:bg-opacity-40"
              + " before:absolute before:right-[-10px] before:-mx-2.5 before:top-0.5"}>
              {comment.body}
            </div>
            <div className="text-right text-[0.8em] mt-5 text-slate-500">
              {dayjsConfig(comment.created_at.toDate()).fromNow()}
            </div>
          </div>
        </div>
        {comment.isOwn &&
          <RemoveMyCommentButton commentId={comment.id} complimentId={comment.compliment_id} removeComment={removeComment} />
        }
      </>
    );
};
