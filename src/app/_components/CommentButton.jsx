import { FaCommentAlt } from "react-icons/fa";

export default function CommentButton({countOfComment = 0}) {

    return (
      <div className="flex items-center mt-1.5">
        <FaCommentAlt className="h-[15px]  text-sky-400 mr-1" />
        <div className="">{countOfComment}</div>
      </div>
    );
};

