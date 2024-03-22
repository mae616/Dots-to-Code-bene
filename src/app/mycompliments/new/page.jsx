"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/_components/Header";
import RatingButton from "@/app/_components/RatingButton";
import TextareaWithLength from "@/app/_components/TextareaWithLength";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import Tags from "@/app/_components/Tags";
import MessageCard from "@/app/_components/MessageCard";
import VoicePlay from "@/app/_components/VoicePlay";
import { mPlus1, mPlus1Bold } from "@/app/_config/themeFontConfig";
import { usePostMyCompliment } from "@/app/_hook/usePostMyCompliment";
import { useRedirectNoAuth } from "@/app/_hook/useRedirectNoAuth";
import { createMessageCard } from "@/app/_utils/CreateMessageCard";
import Makecard from "@/app/_components/makecard/Makecard";
import { Dialog } from "primereact/dialog";

export default function MyComplimentPost() {
  useRedirectNoAuth();
  const [messageCardURL, setMessageCardURL] = useState("");
  const [visible, setVisible] = useState(false);
  const [doCreate, setDoCreate] = useState(false);

  const {
    toName,
    setToName,
    toCategory,
    setToCategory,
    complimentRating,
    setComplimentRating,
    body,
    setBody,
    thoughts,
    setThoughts,
    tags,
    setTags,
    suggestions,
    message,
    setMessage,
    messageCardType,
    setMessageCardType,
    saveCompliment,
    saveComplimentLoading,
  } = usePostMyCompliment();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreate = async () => {
    const messageBody = message;
    const pngURI = await createMessageCard(
      messageBody,
      toName,
      messageCardType
    );
    setMessageCardURL(pngURI);
  };

  useEffect(() => {
    if (doCreate) {
      handleCreate();
    }
  }, [doCreate, message, toName, messageCardType]);

  return (
    <>
      {isClient && (
        <>
          <Header />
          <BreadCrumb
            model={[{ label: "新規投稿" }]}
            home={{
              icon: (
                <FontAwesomeIcon
                  icon={faUser}
                  className="h-[10px] text-slate-500 mr-1"
                />
              ),
              label: "自分の投稿",
              url: "/mycompliments",
            }}
            className="flex text-sm bg-transparent border-none"
          />
          <div className="text-center mx-5">
            <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
              <div className="text-left flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <div className="grow">
                    <h5 className={mPlus1Bold.className + " text-xs"}>
                      ほめたい人の名前
                    </h5>
                    <div className={mPlus1.className}>
                      <InputText
                        value={toName}
                        onChange={(e) => setToName(e.target.value)}
                        type="text"
                        className="text-xs px-2 py-2 h-[2.1rem] w-full"
                      />
                    </div>
                  </div>
                  <div className="grow-0">
                    <div className={mPlus1.className}>
                      <Dropdown
                        value={toCategory}
                        onChange={(e) => setToCategory(e.target.value)}
                        options={[
                          "娘",
                          "息子",
                          "妻",
                          "夫",
                          "母",
                          "父",
                          "姉",
                          "兄",
                          "妹",
                          "弟",
                          "友人",
                          "恋人",
                          "同僚",
                          "後輩",
                          "先輩",
                          "部下",
                          "上司",
                          "仲間",
                          "団体",
                        ]}
                        className="text-xs h-[2.1rem] w-[8.5em]"
                        pt={{ input: "text-xs" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className={mPlus1Bold.className + " text-xs"}>
                    ほめたい度
                  </h5>
                  <RatingButton
                    ratingValue={complimentRating}
                    onChange={(e) => setComplimentRating(e.target.value)}
                  />
                </div>
                <div>
                  <h5 className={mPlus1Bold.className + " text-xs"}>
                    その内容
                  </h5>
                  <div className={mPlus1.className}>
                    <TextareaWithLength
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      maxLength={300}
                    />
                  </div>
                </div>
                <div>
                  <h5 className={mPlus1Bold.className + " text-xs"}>
                    思ったこと
                  </h5>
                  <div className={mPlus1.className}>
                    <TextareaWithLength
                      value={thoughts}
                      onChange={(e) => setThoughts(e.target.value)}
                      maxLength={300}
                    />
                  </div>
                </div>
                <Tags
                  tags={tags}
                  handleAddition={(tag) =>
                    setTags([...tags, { registered: false, ...tag }])
                  }
                  handleDelete={(i) =>
                    setTags(tags.filter((tag, index) => index !== i))
                  }
                  handleInputBlur={(tag) =>
                    tag &&
                    setTags([
                      ...tags,
                      { registered: false, id: tag, text: tag },
                    ])
                  }
                  suggestions={suggestions}
                  max={5}
                />
                <div>
                  <h5 className={mPlus1Bold.className + " text-xs"}>
                    メッセージカード
                  </h5>
                  <div className={mPlus1.className}>
                    <TextareaWithLength
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                </div>
                <div className="mx-auto w-1/2">
                  <>
                    <Button
                      label="カード選択"
                      icon="pi pi-arrow-circle-down"
                      size="small"
                      className="text-sm p-2 bg-pink-600 w-full border-0"
                      onClick={() => setVisible(true)}
                    />
                    <Dialog
                      header=""
                      visible={visible}
                      style={{ width: "50%" }}
                      onHide={() => setVisible(false)}
                    >
                      <Makecard
                        setMessageCardType={setMessageCardType}
                        setVisible={setVisible}
                        setDoCreate={setDoCreate}
                      />
                    </Dialog>
                  </>
                </div>
                <MessageCard messageCardURL={messageCardURL} />
                <div>
                  <VoicePlay messageBody={message} toName={toName} />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-end items-center text-right p-1 mr-2">
            <Link
              href="/mycompliments"
              className="text-sm hover:cursor-pointer text-red-400 mr-3"
            >
              キャンセル
            </Link>
            <Button
              label="保存"
              icon="pi pi-save"
              size="small"
              loading={false}
              onClick={saveCompliment}
            />
          </div>
          <LoadingAnimation loading={saveComplimentLoading} />
        </>
      )}
    </>
  );
}
