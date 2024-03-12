import Image from "next/image";
import Link from "next/link";

export default function Compliments() {
  return (
      <div className="text-center">
        <h1>みんなのほめリストです</h1>
        <Link href="/compliments/1">詳細</Link>
        <br />
        <Link href="/mycompliments">まいほめリスト</Link>
      </div>
  );
}
