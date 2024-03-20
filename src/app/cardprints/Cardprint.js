import React from 'react';

function Cardprint ({created_at,image,nameto,comment,namefrom}){
  return (
      <div className='cardprint-item'>
        <div className='cardprint-date'>{created_at}</div>
        <img 
          className='cardprint-image' 
          src={image} 
        />
        <div>{nameto}</div>
        <div>{comment}</div>
        <div>{namefrom}</div>
      </div>
    );
 }

export default Cardprint;