import Image from "next/image";
import Link from "next/link";

export default function MyComplimentPost() {
  return (
      <div className="text-center">
        <h1>ほめリスト新規登録ページです</h1>
        <Link href="/mycompliments">戻る</Link>
      </div>
  );
}
