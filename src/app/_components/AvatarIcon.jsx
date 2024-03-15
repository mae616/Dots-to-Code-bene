import { Avatar } from 'primereact/avatar';
import { M_PLUS_1 } from  "next/font/google";
const mPlus1 = M_PLUS_1({
  weight: "400",
  subsets: ["latin"],

});
export default function AvatarIcon({name}) {

    return (
      <Avatar label={name[0]} shape="circle" className={mPlus1.className + " bg-amber-200 m-0 p-0 w-[2.5em] h-[2.5em]"} />
    );
};
