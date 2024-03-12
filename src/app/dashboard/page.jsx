'use client';
import Image from "next/image";
import Link from "next/link";
import { useUserInfo } from "@/app/_states/user";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useUserInfo();
  console.log(userInfo);
  return (
      <div className="text-center">
        <h1>ダッシュボードです</h1>
        <Link href="/mycompliments">マイ褒めリストです</Link>
        <br />
        <Link href="/compliments">みんなの褒めリストです</Link>
        <br />
        <Link href="/derivatives">お子さん用のメッセージページです</Link>
      </div>
  );
}
