'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/app/_config/firebase";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Zen_Maru_Gothic } from  "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useUserInfo } from "@/app/_states/user";
const auth = getAuth(firebaseApp);

const ZenMaruGothic = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useUserInfo();
  const router = useRouter();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword (auth, email, password);
      const user = userCredential.user;
      setUserInfo(user);
  router.push('./mycompliments');
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <div className="text-center pt-20 px-8">
        <h1 className={ZenMaruGothic.className + " text-lg my-3"}><Link href="/">ほめるん</Link></h1>
        <form onSubmit={(e) => { e.preventDefault(); login(); }}>
          <Card title="ログイン" >

          <div className="text-left">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="email" >e-mailアドレス</label>
              <InputText id="email" placeholder="test@example.com" className="text-sm"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="password">password</label>
              <Password toggleMask
                promptLabel="Choose a password" weakLabel="単純すぎます" mediumLabel="平均的です" strongLabel="良いパスワードです"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
            <Button label="ログイン" className="w-36" />
          </Card>
        </form>
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faRightToBracket} className="h-[12px] text-slate-500 mr-2" />
          <Link href="/signup" className="text-slate-500 text-sm">新規登録</Link>
        </div>
      </div>
  );
}
