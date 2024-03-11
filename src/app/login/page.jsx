import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
      <div className="text-center">
        <h1>ログインページです</h1>
        <Link href="/signup">新規登録</Link>
        <br />
        <Link href="/">ホーム</Link>
      </div>
  );
}
