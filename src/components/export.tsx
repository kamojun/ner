import React from 'react';
import { RootContext } from './context'



const Button = () => {
  const { state: { sentences } } = React.useContext(RootContext)
  const exportfile = () => {
    console.log(
      sentences.map(
        sentence => sentence.map(
          ({ content, tag }) => `${content}\t${tag || 'O'}`
        ).join('\n')
      ).join('\n\n') + '\n\n'
    )
  }
  return (
    <button onClick={exportfile}>
      エクスポート
    </button >
  );
}
export default Button