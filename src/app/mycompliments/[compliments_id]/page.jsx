import Image from "next/image";
import Link from "next/link";

export default function MyComplimentCard() {
  return (
      <div className="text-center">
        <h1>マイほめ詳細ページです</h1>
        <Link href="/mycompliments">戻る</Link>
      </div>
  );
}
