import React from 'react';
import { RootContext } from './context'



const Button = () => {
  const { state: { sentences } } = React.useContext(RootContext)
  const exportfile = () => {
    console.log(sentences.join('\n\n'))
  }
  return (
    <button onClick={exportfile}>
      エクスポート
    </button >
  );
}
export default Button