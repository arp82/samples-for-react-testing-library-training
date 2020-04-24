import React from 'react';
import './Button.less';

interface ButtonProps{
  onClickButton: (event) => void;
  
}

export const Button = (props:ButtonProps) =>{
  const handleOnClick = () => {
    props.onClickButton(event);
  };
  return (
    <button onClick={handleOnClick} className="dButton"> Hi, click me! </button>
  );
};