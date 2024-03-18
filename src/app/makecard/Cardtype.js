import React from 'react';

function Cardtype ({name,image}){
  return (
      <div className='cardtype-item'>
        <div className='cardtype-name'>{name}</div>
        <img 
          className='cardtype-image' 
          src={image} 
        />
      </div>
    );
 }

export default Cardtype;