'use client';
import { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmPopup } from 'primereact/confirmpopup'; 
import { useRemoveMyCompliment } from "@/app/_hook/useRemoveMyCompliment";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

export default function RemoveMyComplimentButton({complimentId}) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const { removeCompliment, removeLoading, removeError, setRemoveError } = useRemoveMyCompliment(complimentId);
    const removeBtnRef = useRef(null);

    if (removeError) {
        toast.current.show({severity:'error', summary:'エラー', detail:'削除に失敗しました', life: 3000});
        console.error("Error removing document: ", removeError);
        setRemoveError(null);
    }

    return (
        <>
            <Toast ref={toast} className="text-left" />
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
                                <Button ref={acceptBtnRef} label="削除する" onClick={() => {removeCompliment(); setVisible(false);}} severity="danger" className="p-button-sm p-button-outlined border-red-400 text-red-400 hover:border-red-700 hover:bg-red-200" />
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
            <LoadingAnimation loading={removeLoading} />
        </>
    );
};
