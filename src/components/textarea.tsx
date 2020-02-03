import React from 'react'
import styled from 'styled-components'
import { Sentence, Sentence2 } from './sentence'
import { RootContext, NamedEntity, Entry } from '../context'

const Div = styled.div`
  margin: 0, auto;
  width: 100%;
  border-width: 2;
`

const TextArea = ({ sentences, entries }: { sentences: NamedEntity[][], entries: Entry[] }) => {
  return (
    <Div>{entries.map((entry, snum) => <Sentence2 key={snum} {...{ snum, entry }}></Sentence2>)}</Div>
    // <Div>{sentences.map((line, i) => <Sentence key={i} sentenceNum={i} sentence={line} />)}</Div>
  )
}

export default TextArea