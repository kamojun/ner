import React, { Children } from 'react';
import { RootContext } from '../context'
import styled from 'styled-components'

const Pre = styled.pre`
  border: 1px solid #000;
`

const SwitchDisplay = ({ text, children }: { text: string, children?: string }) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {!show ? children : "かくす"}
      </button >
      {show ? <Pre>{text}</Pre> : null}
    </>
  );
}
export default SwitchDisplay