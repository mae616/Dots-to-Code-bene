'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useIsAuth } from '@/app/_states/user';
import TextareaWithLength from './TextareaWithLength';

export default function PostComment({complimentId, postComment}) {
    const [body, setBody] = useState('');
    const isAuth = useIsAuth();
    const refElement = useRef(null);

    if (!isAuth) {
      return null;
    }

    useEffect(() => {
      if(window.location.hash === "#post_comment") {
        refElement.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    , [refElement.current]);

    return (
      <div ref={refElement}>
        <TextareaWithLength value={body} onChange={(e)=>setBody(e.target.value)} maxLength={200} />
        <div className="text-center">
          <Button label="投稿する" icon="pi pi-check" loading={false} size="small" onClick={()=>{postComment(complimentId, body);setBody("")}} />
        </div>
      </div>
    );
};
