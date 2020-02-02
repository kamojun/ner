import React from 'react';
import moment from 'moment'
import styled from 'styled-components'

const A = styled.a`
  display: inline-block;
  background-color: skyblue; 
  border: 2px solid skyblue;
  border-radius: 10px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
  &:hover {
    color: skyblue;
    background-color: white;
    transition-duration: 50ms;
  }
`


const Button: React.FC<{ filename: string, text: string }> = ({ filename, text }) => {
  const [date, setDate] = React.useState('')
  const basename = filename.includes('_') ? filename.split('_').slice(0, -1).join('_') : filename.replace(/\.txt$/, '')
  return (
    <A download={`${basename}_${date}.txt`} href={URL.createObjectURL(new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), text]))} target='blank' onClick={() => setDate(moment().format("YYYYMMDDhhmm"))}>
      エクスポート
    </A>
  );
}
export default Button