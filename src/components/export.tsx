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
  const timeformat = "YYYYMMDDhhmm"
  const basename = filename.replace(new RegExp('(_' + '\d'.repeat(timeformat.length) + ')?\.txt$'), '')   // 末尾に"_日付.txt"か".txt"があれば除去
  return (
    <A download={`${basename}_${date}.txt`} href={URL.createObjectURL(new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), text]))} target='blank' onClick={() => setDate(moment().format(timeformat))}>
      エクスポート
    </A>
  );
}
export default Button