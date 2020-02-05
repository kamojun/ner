import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

// position: fixedは失敗
const BackGround = styled.div`
  width: 120%;
  height: 120%;
  z-index: 200;
  position: fixed;
`

const Div = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  background-color: gray;
  opacity: 0.95;
  border: solid 1px black;
`
const MenuItem = styled.div`
  &:hover {
    background-color: skyblue;
  }
`

const ContextMenu: React.FC<{ receiveChoice: (i: number | null) => void, pos: { x: number, y: number }, choice: [string, number][] }> = ({ receiveChoice, pos, choice }) => {
  // const [visible, setVisible] = React.useState(false)
  const onClick = (i: number | null) => () => {
    receiveChoice(i)
  }
  return ReactDom.createPortal(
    <BackGround onClick={onClick(null)}>
      <Div {...pos}>
        {/* <MenuItem onClick={() => receiveChoice(1)}>choice1</MenuItem>
      <MenuItem onClick={() => receiveChoice(2)}>choice2</MenuItem> */}
        {choice.map(([name, num]) => <MenuItem key={num} onClick={onClick(num)}>{name}</MenuItem>)}
      </Div>
    </BackGround>, document.getElementById("context-menu")
  )
}

export default ContextMenu