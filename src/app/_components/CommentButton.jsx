import { useRouter } from "next/navigation";
import { FaCommentAlt } from "react-icons/fa";

export default function CommentButton({countOfComment = 0, complimentRoute}) {
    const router = useRouter();

    return (
      <div className="flex items-center mt-1.5 hover:cursor-pointer z-10" onClick={()=> router.push(`${complimentRoute}#post_comment`)}>
        <FaCommentAlt className="h-[15px]  text-sky-400 mr-1" />
        {countOfComment}
      </div>
    );
};

