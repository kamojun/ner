import React, { Children } from 'react';
import styled from 'styled-components'

const Div = styled.div`
  border: 1px solid #000;
  white-space: pre-wrap;
  margin: auto;
  width: 90%;
  height: 200px;
  overflow: scroll;
  font-size: small;
`

const SwitchDisplay = ({ text, children }: { text: string, children?: string }) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {!show ? children : "かくす"}
      </button >
      {show ? <Div>{text}</Div> : null}
    </>
  );
}
export default SwitchDisplay