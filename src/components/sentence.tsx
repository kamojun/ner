import React from 'react'
import styled from 'styled-components'
import Tagged from './tagged'
import { Entry, useRootContext } from '../context'

const Div = styled.div`
  margin: 5,5,5,5;
  padding: 10 0 10 0;
  display: flex;
  border-top: solid 1px black;
`

const Reset = styled.div`
  align-self: center;
  border-radius: 10px;
  background-color: gray;
  transform: scale(0.8, 0.8);
  opacity: 0.8;
  white-space: nowrap;
  &:hover{
    opacity: 0.6;
  }
`

// [tag, startposition, text, tagnum]
type Part = [string | null, number, string, number | null]
const text_splitter = (entry: Entry) => {
  let parts: Part[] = [[null, 0, entry.text, null]]
  entry.annots.forEach(({ tag, a, b }, tagnum) => {
    // a, bはtext上の絶対的な位置
    parts = parts.flatMap(([tag_, a_, text, num]) => {
      // a_はこのpartのtext上の開始点
      const b_ = a_ + text.length  // このpartの終了点
      if ((a_ <= a) && (b <= b_)) {
        const left: Part = [tag_, a_, text.slice(0, a - a_), num]
        const middle: Part = [tag, a, text.slice(a - a_, b - a_), tagnum]
        const right: Part = [tag_, b, text.slice(b - a_), num]
        return [left, middle, right].flatMap(part => part[2].length == 0 ? [] : [part])
      }
      return [[tag_, a_, text, num]]
    })
  })
  return parts
}

const Sentence: React.FC<{ snum: number, entry: Entry }> = (props) => {
  const { dispatch } = useRootContext();
  const { snum, entry } = props
  const parts = text_splitter(entry)
  return (
    <>
      <Div>
        <Reset onClick={() => dispatch({ type: 'reset', ...props })}>リセット</Reset>
        <div>
          {parts.map(([tag, startposition, text, tnum]) => <Tagged key={startposition} {...{ snum, tag, startposition, tnum }}>{text}</Tagged>)}
        </div>
      </Div>
    </>
  )
}


export { Sentence }