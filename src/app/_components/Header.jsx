'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/_config/firebase";
import { ZenMaruGothic } from "@/app/_config/themeFontConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useUserInfo } from "@/app/_states/user";


export default function Header() {
  const [userInfo, setUserInfo] = useUserInfo();
  const router = useRouter();

  return (
      <div className="flex w-full items-center justify-between">
        <h1 className={ZenMaruGothic.className + " text-2xl my-3 grow px-3"}><Link href="/mycompliments">ほめるん</Link></h1>
        <div className="flex grow-0 items-center text-sm">
          <Link href="/mycompliments">
            <FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />
            自分の投稿
          </Link>
        </div>
        <div className="flex grow-0 items-center text-sm px-3">
          <Link href="/compliments">
            <FontAwesomeIcon icon={faUsers} className="h-[10px] text-slate-500 mr-1" />
            みんなの投稿
          </Link>
        </div>
        <div className="flex grow-0 items-center text-sm pr-3">
          <div onClick={() => { signOut(auth); setUserInfo({}); router.push('/') }}>
            <FontAwesomeIcon icon={faSignOut} className="h-[10px] text-slate-500" />
          </div>
        </div>
      </div>
  );
}
