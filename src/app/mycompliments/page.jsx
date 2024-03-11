import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
      <div className="text-center">
        <h1>マイほめリストです</h1>
        <Link href="/login">ログイン</Link>
        <br />
        <Link href="/">ホーム</Link>
      </div>
  );
}
