import React from "react";

function Cardtype({
  name,
  image,
  setMessageCardType,
  setVisible,
  setDoCreate,
}) {
  const handleClick = () => {
    setMessageCardType(name);
    setVisible(false);
    setDoCreate(true);
  };
  return (
    <div className="hover:cursor-pointer" onClick={handleClick}>
      <img className="w-11/12 p-2 justify-center rounded" src={image} />
    </div>
  );
}

export default Cardtype;
