import React from 'react'
import styled from 'styled-components'
import Sentence from './sentence'
import { RootContext } from './context'

const Div = styled.div`
  margin: 0, auto;
  width: 80%;
  border-width: 2;
`

const TextArea = ({ sentences }: { sentences: string[] }) => {
  return (
    <Div>{sentences.map((line, i) => <Sentence key={i} num={i}>{line}</Sentence>)}</Div>
  )
}

export default TextArea