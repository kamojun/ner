import React from 'react'
import styled from 'styled-components'
import Tagged from './tagged'
import { NamedEntity, RootContext } from '../context'
import { TagSpan } from './tag'

const Div = styled.div`
  margin: 5,5,5,5;
  flex: inline;
`

const Reset = styled.div`
  display: inline-block;
  border-radius: 10px;
  background-color: gray;
  transform: scale(0.8, 0.8);
  opacity: 0.8;
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


export default Sentence