import Image from "next/image";
import Link from "next/link";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { M_PLUS_1 } from  "next/font/google";
import Header from "@/app/_components/Header";
import RatingButton from "@/app/_components/RatingButton";
import TextareaWithLength from "@/app/_components/TextareaWithLength";
import Tags from "@/app/_components/Tags";
import MessageCard from "@/app/_components/MessageCard";
import VoicePlay from "@/app/_components/VoicePlay";

const mPlus1 = M_PLUS_1({
  weight: "400",
  subsets: ["latin"],

});

const mPlus1Bold = M_PLUS_1({
  weight: "800",
  subsets: ["latin"],

});

export default function MyComplimentPost() {
  return (
    <>
      <Header />
      <BreadCrumb model={[{label: '新規投稿'}]} home={{
        icon:<FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />,
        label: '自分の投稿',
        url: '/mycompliments'
    }} className="flex text-sm bg-transparent border-none"/>
      <div className="text-center mx-5">

        <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
          <div className="text-left flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <div className="grow">
                <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい人の名前</h5>
                <div className={mPlus1.className}>
                  <InputText type="text" className="text-xs px-2 py-2 h-[2.1rem] w-full" />
                </div>
              </div>
              <div className="grow-0">
                <div className={mPlus1.className}>
                  <Dropdown options={["娘", "妻", "夫", "母", "父", "姉", "兄", "妹", "弟","同僚", "後輩"]} 
                    className="text-xs h-[2.1rem] w-[7em]" />
                </div>
              </div>
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい度</h5>
              <RatingButton ratingValue={3} />
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>その内容</h5>
              <div className={mPlus1.className}>
                <TextareaWithLength />
              </div>
            </div>
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>思ったこと</h5>
              <div className={mPlus1.className}>
                <TextareaWithLength />
              </div>
            </div>
            <Tags />
            <div>
              <h5 className={mPlus1Bold.className + " text-xs"}>メッセージカード</h5>
              <div className={mPlus1.className}>
                <TextareaWithLength />
              </div>
            </div>
            <div className="mx-auto w-1/2">
              <Button label="生成" icon="pi pi-arrow-circle-down" size="small" className="text-sm p-2 bg-pink-600 w-full border-0" loading={false} />
            </div>
            <MessageCard />
            <div>
              <VoicePlay />
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-end items-center text-right p-1 mr-2">
        <Link href="/mycompliments" className="text-sm hover:cursor-pointer text-red-400 mr-3">キャンセル</Link>
        <Button label="保存" icon="pi pi-save" size="small" loading={false} />
      </div>
    </>
  );
}
