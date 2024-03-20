import React from 'react';
import Cardprint from './Cardprint';
        
function PrintCard (){
  const CardPrintList = [
      {
        created_at: '2024/3/24',
        image:'/Cardimage/Flowercard.png',
        nameto:'まきさんへ',
        namefrom:'いつもまきさんを応援する母より',
        comment:'この間の運動会では、一所懸命走っている姿がとても頼もしかったな。残念ながら順位は4位で入賞を逃したけれど、最後まであきらめずに精一杯走っていたのがかっこよかった。',

      },
      
    ];

    return (
      <div>        
        <div className='cardtype'>
          {/* mapメソッドを用いて、Languageコンポーネントを表示してください */}
          {cardprintList.map((CardPrintItem) => {
            return (
              // Languageコンポーネントを呼び出し、その中でpropsを渡してください
             <CardPrintItem
              date={CardPrintItem.date}
              nameto={CardPrintItem.nameto}
              image={CardPrintItem.image}
              comment={CardPrintItem.comment}
              namefrom={CardPrintItem.namefrom}
             />
            )
          })}
          
        </div>
        <h1>この内容で良いですか？</h1>
        <button>OK</button>
      </div>
    );
  }


export default PrintCard;