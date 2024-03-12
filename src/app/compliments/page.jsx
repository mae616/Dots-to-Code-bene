import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
      <div className="text-center">
        <h1>みんなのほめリストです</h1>
        <Link href="/compliments/1">詳細</Link>
        <br />
        <Link href="/dashboard">ダッシュボード</Link>
      </div>
  );
}
