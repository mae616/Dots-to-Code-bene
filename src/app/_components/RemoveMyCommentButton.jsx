'use client';
import { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup'; 

export default function RemoveMyCommentButton({commentId, complimentId, removeComment}) {
    const [visible, setVisible] = useState(false);
    const removeBtnRef = useRef(null);

    return (
        <>
            <ConfirmPopup
                target={removeBtnRef.current}
                visible={visible}
                onHide={() => setVisible(false)}
                group="headless"
                content={({message, acceptBtnRef, rejectBtnRef}) => {
                    return (
                        <div className="bg-white border-round p-3">
                            <span className="text-sm"><i className="pi pi-exclamation-triangle text-red-400 pr-1" />{message}</span>
                            <div className="flex align-items-center gap-2 mt-3">
                                <Button ref={acceptBtnRef} label="削除する" onClick={() => {removeComment(commentId, complimentId); setVisible(false);}} severity="danger" className="p-button-sm p-button-outlined border-red-400 text-red-400 hover:border-red-700 hover:bg-red-200" />
                                <Button ref={rejectBtnRef} label="キャンセル" outlined onClick={() => {setVisible(false);}} severity="danger" className="p-button-sm p-button-text" />
                            </div>
                        </div>
                    );
                }}
                message="本当に削除しますか？"
            />
            <div className="flex justify-end items-center">
                <div ref={removeBtnRef} onClick={() => setVisible(true)} className="m-0 cursor-pointer text-sm text-red-400 hover:text-red-700" >
                    <i className="pi pi-trash pr-1" />
                    削除
                </div>
            </div>
        </>
    );
};
