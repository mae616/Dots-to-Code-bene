import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-96 sm:w-full mx-auto bg-slate-200 h-screen">
      <div className="text-center">
        <h1>ほめるん</h1>
        <Link href="/login">ログイン</Link> <Link href="/signup">新規登録</Link>
        <br />
        ランディングページ
      </div>
    </main>
  );
}
