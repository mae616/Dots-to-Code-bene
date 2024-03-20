"use client";
import { BsFillCloudDownloadFill } from "react-icons/bs";
export default function MessageCard({ readOnly = false }) {
  return (
    <div className="relative">
      <img src="https://placehold.jp/960x660.png" />
      {!readOnly && (
        <div className="absolute top-0 left-0 bg-transparent w-full h-full z-10">
          <div className="absolute top-3 left-[85%] z-20 w-max">
            <BsFillCloudDownloadFill className="text-3xl text-sky-600 text-opacity-60" />
          </div>
        </div>
      )}
    </div>
  );
}
