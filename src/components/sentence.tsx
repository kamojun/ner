import React from 'react'
import styled from 'styled-components'
import Tagged from './tagged'
import { NamedEntity, RootContext, Entry, useRootContext } from '../context'
import { TagSpan } from './tag'

const Div = styled.div`
  margin: 5,5,5,5;
  display: flex;
`
const Text = styled.div`
  color: black;
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

type Props = { sentenceNum: number, sentence: NamedEntity[] }
const Sentence: React.FC<Props> = (props) => {
  const { dispatch } = React.useContext(RootContext)
  return (
    <Div>
      <Reset onClick={() => dispatch({ type: 'reset', snum: props.sentenceNum })}>リセット</Reset>
      {props.sentence.map((block, i) =>
        <Tagged key={i} blockNum={i} sentenceNum={props.sentenceNum} str={block}></Tagged>
      )}
    </Div>
  )
}

const Sentence2: React.FC<{ key: number, snum: number, entry: Entry }> = (props) => {
  const { dispatch } = useRootContext();
  return (
    <>
      <Div>
        <Reset onClick={() => dispatch({ type: 'reset', ...props })}>リセット</Reset>
        <Text>{props.entry.text}</Text>
        {/* {props.entry.annots.map((annot, i) => (
        <span key={i}>{i}{props.entry.text}</span>
      ))} */}
      </Div>
    </>
  )
}


export { Sentence, Sentence2 }