import React from 'react';



const Button = ({ text }) => {
  const exportfile = () => {
    console.log(text)
  }
  return (
    <button onClick={exportfile}>
      エクスポート
    </button >
  );
}
export default Button