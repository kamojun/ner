import React from 'react'
import styled from 'styled-components'
import { RootContext } from './context'

const Div = styled.div`
  margin: 0, auto;
  width: 80%;
  border-width: 2;
`

const Sentence: React.FC<{ num: number, children: string }> = ({ num, children }) => {
  const { dispatch } = React.useContext(RootContext)
  return (
    <p onClick={() => dispatch({ type: "add", text: String(num) })}>{children}</p>
  )
}

export default Sentence