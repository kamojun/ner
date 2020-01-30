import React from 'react'
import styled from 'styled-components'
import Sentence from './sentence'
import { RootContext, NamedEntity } from './context'

const Div = styled.div`
  margin: 0, auto;
  width: 80%;
  border-width: 2;
`

const TextArea = ({ sentences }: { sentences: NamedEntity[][] }) => {
  return (
    <Div>{sentences.map((line, i) => <Sentence key={i} sentenceNum={i} sentence={line} />)}</Div>
  )
}

export default TextArea