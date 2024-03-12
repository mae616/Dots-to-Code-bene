'use client';
import Image from "next/image";
import Link from "next/link";
import { useUserInfo } from "@/app/_states/user";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useUserInfo();
  console.log(userInfo);
  return (
      <div className="text-center">
        <h1>メッセージページリストです</h1>
        <Link href="/derivatives/1">メッセージ ユーザページ</Link>
        <br />
        <Link href="/derivatives/settings">メッセージ 設定ページ</Link>
        <br />
        <Link href="/dashboard">ダッシュボード</Link>
      </div>
  );
}
