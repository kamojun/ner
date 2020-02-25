import React from 'react'
import styled from 'styled-components'
import { Sentence } from './sentence'
import { Entry } from '../context'

const Div = styled.div`
  margin: 0, auto;
  width: 100%;
`
const Spacer = styled.div`
  width: 100%;
  /* padding: 10px 0; */
  border-top: solid 1px black;
  margin-bottom: ${props => props.margin_bottom || 0}px;
`

const TextArea = ({ entries }: { entries: Entry[] }) => {
  return (
    <Div>{entries.map((entry, snum) =>
      <Spacer key={snum}><Sentence {...{ snum, entry }}></Sentence></Spacer>
    )}
      <Spacer margin_bottom={window.outerHeight / 2}></Spacer>
    </Div>
  )
}

export default TextArea