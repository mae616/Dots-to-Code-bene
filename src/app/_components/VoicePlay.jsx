import { Slider } from 'primereact/slider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { BsFillCloudDownloadFill } from "react-icons/bs";

export default function VoicePlay({}) {
  return (
    <div className="flex items-center justify-between">
      <FontAwesomeIcon icon={faPlay} className="h-[10px] text-slate-500" />
      <Slider value={5} className='w-2/3'/>
      <i className="pi pi-spin pi-spinner text-slate-500" />
      <BsFillCloudDownloadFill className="text-lg text-sky-600" />
  </div>
  );
};

