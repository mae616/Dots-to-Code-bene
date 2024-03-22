"use client";
import { BsFillCloudDownloadFill } from "react-icons/bs";
export default function MessageCard({ readOnly = false, messageCardURL }) {
  return (
    <div className="relative">
      {messageCardURL ? (
        <img src={messageCardURL} className="w-full object-contain" />
      ) : (
        <img
          src="https://placehold.jp/825x637.5?text=message+card"
          className="w-full object-contain"
        />
      )}
      {!readOnly && (
        <div className="absolute top-0 left-0 bg-transparent w-full h-full z-10">
          <div className="absolute top-3 left-[85%] z-20 w-max">
            {messageCardURL && (
              <a href={messageCardURL} download="message-card.png">
                <BsFillCloudDownloadFill className="text-3xl text-sky-600 text-opacity-60" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
