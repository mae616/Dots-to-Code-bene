'use client';
import { useRouter } from "next/navigation";
import { FaCommentAlt } from "react-icons/fa";

export default function CommentButton({countOfComment = 0, complimentRoute}) {
    const router = useRouter();

    const handleClick = (e) => {
      e.preventDefault();
      router.push(`${complimentRoute}?post_comment=true`);
    };

    return (
      <div className="flex items-center mt-1.5 hover:cursor-pointer px-2 z-10" onClick={handleClick}>
        <FaCommentAlt className="h-[15px]  text-sky-400 mr-1" />
        {countOfComment}
      </div>
    );
};

