'use client';
import { useState } from 'react';
import { Button } from 'primereact/button';
import TextareaWithLength from './TextareaWithLength';

export default function PostComment({complimentId, postComment}) {
    const [body, setBody] = useState('');

    return (
      <div id="post_comment">
        <TextareaWithLength value={body} onChange={(e)=>setBody(e.target.value)} maxLength={200} />
        <div className="text-center">
          <Button label="投稿する" icon="pi pi-check" loading={false} size="small" onClick={()=>{postComment(complimentId, body);setBody("")}} />
        </div>
      </div>
    );
};
