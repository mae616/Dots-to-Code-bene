import Image from "next/image";
import Link from "next/link";

export default function MyCompliments() {
  return (
      <div className="text-center">
        <h1>マイほめリストです</h1>
        <Link href="/mycompliments/new">新規投稿</Link>
        <br />
        <Link href="/mycompliments/1">詳細</Link>
        <br />
        <Link href="/compliments">みんなの褒めリスト</Link>
      </div>
  );
}
