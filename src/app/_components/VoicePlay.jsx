"use client";
import { useState, useEffect } from "react";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { playVoice, appendVoices } from "@/app/_utils/Voice";

export default function VoicePlay({
  readOnly = false,
  messageBody,
  toName = "",
}) {
  const [voices, setVoices] = useState([]);
  const [selectVoice, setSelectVoice] = useState("");

  useEffect(() => {
    const voices = appendVoices();
    setVoices(voices);
    setSelectVoice(voices[0]);
  }, []);

  const handlePlayVoice = () => {
    if (messageBody) {
      playVoice(selectVoice, messageBody, toName);
    }
  };

  return (
    <>
      {voices && voices.length > 0 && (
        <div className="flex items-center justify-start gap-7">
          <Dropdown
            value={selectVoice}
            onChange={(e) => setSelectVoice(e.target.value)}
            options={voices}
            className="text-xs h-[2.1rem]"
            pt={{ input: "text-sm" }}
          />
          <div onClick={handlePlayVoice}>
            <FontAwesomeIcon
              icon={faPlay}
              className="h-[10px] text-slate-500"
            />
          </div>
          {!readOnly && (
            <>
              {/* <i className="pi pi-spin pi-spinner text-slate-500" /> */}
              <BsFillCloudDownloadFill className="text-lg text-sky-600" />
            </>
          )}
        </div>
      )}
    </>
  );
}
