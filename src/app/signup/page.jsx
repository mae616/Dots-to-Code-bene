import Image from "next/image";
import Link from "next/link";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Zen_Maru_Gothic } from  "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const ZenMaruGothic = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {
  return (
      <div className="text-center pt-20 px-8">
        <h1 className={ZenMaruGothic.className + " text-lg my-3"}><Link href="/">ほめるん</Link></h1>
        <Card title="新規登録" >

        <div className="text-left">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" >e-mailアドレス</label>
            <InputText id="email" placeholder="test@example.com" className="text-sm" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password">password</label>
            <Password toggleMask
              promptLabel="Choose a password" weakLabel="単純すぎます" mediumLabel="平均的です" strongLabel="良いパスワードです"/>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">ユーザー名</label>
            <InputText id="username" aria-describedby="username-help" />
            <small id="username-help">
                アプリ内で表示されるニックネームです。
            </small>
          </div>
         </div>

          <Button label="新規登録" className="w-36" />
        </Card>
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faRightToBracket} className="h-[12px] text-slate-500 mr-2" />
          <Link href="/login" className="text-slate-500 text-sm">ログイン</Link>
        </div>
      </div>
  );
}
