import React from 'react'
import styled from 'styled-components'
import Tagged from './tagged'
import { NamedEntity } from './context'
import { RootContext } from './context'
import { TagSpan } from './color'

const Div = styled.div`
  margin: 5,5,5,5;
  flex: inline;
`

type Props = { sentenceNum: number, sentence: NamedEntity[] }
const Sentence: React.FC<Props> = (props) => {
  const { dispatch } = React.useContext(RootContext)
  return (
    <Div>
      <TagSpan color={'rgba(0,0,255,0.5)'} onClick={() => dispatch({ type: 'reset', text: String(props.sentenceNum) })}>リセット</TagSpan>
      {props.sentence.map((block, i) =>
        <Tagged key={i} blockNum={i} sentenceNum={props.sentenceNum} str={block}></Tagged>
      )}
    </Div>
  )
}


export default Sentence