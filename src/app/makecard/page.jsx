import React from 'react';
import Cardtype from './Cardtype';
        
function Makecard (){
  const cardtypeList = [
      {
        name: 'flower',
        image:'/Cardimage/Flowercard.png'
      },
      {
        name: 'penguin',
        image: '/Cardimage/Penguincard.png'
      },
      {
        name: 'risu',
        image: '/Cardimage/Risucard.png'
      },
      {
        name: 'simple',
        image: '/Cardimage/Simplecard.png'
      },      
    ];

    return (
      <div>
        <h1 className="flex flex-col text-2xl items-center justify-center pt-4 mb-2">好きなカードをえらんでね</h1>
        <div className="grid grid-cols-2 items-center gap-5">
          {/* mapメソッドを用いて、Languageコンポーネントを表示してください */}
          {cardtypeList.map((cardtypeItem) => {
            return (
              // Languageコンポーネントを呼び出し、その中でpropsを渡してください
             <Cardtype
              name={cardtypeItem.name}
              image={cardtypeItem.image}
             />
            )
          })}
          
        </div>
      </div>
    );
  }


export default Makecard;