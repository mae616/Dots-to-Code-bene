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
        <h1>好きなカードをえらんでね</h1>
        <div className='cardtype'>
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