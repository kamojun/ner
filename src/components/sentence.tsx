import React from 'react'
import styled from 'styled-components'
import Tagged from './tagged'
import { NamedEntity, RootContext } from '../context'
import { TagSpan } from './tag'

const Div = styled.div`
  margin: 5,5,5,5;
  flex: inline;
`

type Props = { sentenceNum: number, sentence: NamedEntity[] }
const Sentence: React.FC<Props> = (props) => {
  const { dispatch } = React.useContext(RootContext)
  return (
    <Div>
      <TagSpan tag="リセット" color="gray" onClick={() => dispatch({ type: 'reset', snum: props.sentenceNum })}></TagSpan>
      {props.sentence.map((block, i) =>
        <Tagged key={i} blockNum={i} sentenceNum={props.sentenceNum} str={block}></Tagged>
      )}
    </Div>
  )
}


export default Sentence