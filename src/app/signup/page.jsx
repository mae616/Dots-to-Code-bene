import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main className="w-96 mx-auto bg-slate-200 h-screen">
      <div className="text-center">
        <h1>新規登録ページです</h1>
        <Link href="/login">ログイン</Link>
        <br />
        <Link href="/">ホーム</Link>
      </div>
    </main>
  );
}
