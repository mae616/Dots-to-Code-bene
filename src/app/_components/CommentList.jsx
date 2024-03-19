'use client';
import { useState } from "react";
import CommentCard from "./CommentCard";
import OwnCommentCard from "./OwnCommentCard";
import PostComment from "./PostComment";
import { useFetchComments } from "@/app/_hook/useFetchComments";
import { useComments } from "@/app/_hook/useComments";

export default function CommentList({countOfComment = 0, complimentId, complimentAuthorId}) {
  const [ count, setCount ] = useState(countOfComment);
  const { comments } = useFetchComments(complimentId, complimentAuthorId);
  const { postComment, removeComment } = useComments();

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, index) => {
        if(comment.isAuthorComment){
          return (<OwnCommentCard key={index} comment={comment} removeComment={removeComment} />);
        }else{
          return (<CommentCard key={index} comment={comment} removeComment={removeComment} />);
        }
      })}
      <PostComment complimentId={complimentId} postComment={postComment} />
    </div>
  );
};
