import React from 'react';

function Cardtype ({name,image}){
  return (
      <div>
       <img 
          className="w-11/12 p-2 justify-center rounded" 
          src={image} 
        />
    
      </div>
    );
 }

 







export default Cardtype;