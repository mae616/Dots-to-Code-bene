'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/_config/firebase";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useUserInfo } from "@/app/_states/user";
import { ZenMaruGothic } from  "@/app/_config/themeFontConfig";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsSignUpOrLogIn} = useUserInfo();
  const router = useRouter();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword (auth, email, password);
      const user = userCredential.user;
      setIsSignUpOrLogIn(true);
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
              <Password toggleMask value={password} onChange={(e) => setPassword(e.target.value)} 
                feedback={false} />
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
