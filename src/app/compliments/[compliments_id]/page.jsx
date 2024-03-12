import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
      <div className="text-center">
        <h1>みんなのほめ詳細ページです</h1>
        <Link href="/compliments">戻る</Link>
      </div>
  );
}
