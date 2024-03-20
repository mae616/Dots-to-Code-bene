import React from 'react';
import Cardprint from './Cardprint';
import { Dai_Banna_SIL } from 'next/font/google';

export default function PrintCard() {
  return(
    <>{/* ここからテスト挿入　0320  */}
    <main>
      <img src="/Cardimage/Flowercard.png"/>
       <div>2024/3/24</div>
       <div>
          <p>まきさんへ</p>
          <div>いつもまきさんを応援する母より</div>
          <div>
          この間の運動会では、一所懸命走っている姿がとても頼もしかったな。残念ながら順位は4位で入賞を逃したけれど、最後まであきらめずに精一杯走っていたのがかっこよかった。
          </div>
        </div>
      
      <h1>この内容で良いですか？</h1>
      <button>OK</button>
    </main></>
  );
}
 