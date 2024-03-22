import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-96 sm:w-full mx-auto bg-slate-200 h-screen">
      <div className="text-center">
        <img src="/images/title_text.png" />
        <Link href="/login">ログイン</Link> <Link href="/signup">新規登録</Link><br />
        <Link href="/compliments">みんなのほめ投稿</Link><br />
        <Link href="/guide">ほめ力アップのTips！</Link>
        <table className="mx-auto mt-4 border-collapse border border-slate-500 bg-white">
            <tbody>
             <tr>
              <td className="border border-slate-600 p-4">ほめて伸ばす！はわかるけど<br />どうすればほめ上手になれるの？</td>
            </tr>
            </tbody>           
        </table>
        <img src="/images/top.png" />
         <table className="mx-auto mt-4 border-collapse border border-slate-500 bg-white">
            <tbody>
             <tr>
              <td className="border border-slate-600 p-4">他の人はどうやってほめてるの？</td>
            </tr>
            </tbody>           
        </table>
         <br />
        <div>ほめるんでほめ上手になりませんか？</div>
        <br />
      </div>
    </main>
  );
}
