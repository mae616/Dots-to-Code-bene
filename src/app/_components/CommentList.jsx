import CommentCard from "./CommentCard";
import OwnCommentCard from "./OwnCommentCard";

export default function CommentList({countOfComment = 0}) {

    return (
      <div className="flex flex-col gap-4">
        <CommentCard />
        <OwnCommentCard />
      </div>
    );
};
