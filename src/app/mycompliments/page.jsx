import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
      <div className="text-center">
        <h1>マイほめリストです</h1>
        <Link href="/mycompliments/new">新規投稿</Link>
        <br />
        <Link href="/mycompliments/1">詳細</Link>
        <br />
        <Link href="/dashboard">ダッシュボード</Link>
      </div>
  );
}
