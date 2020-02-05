import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

// position: fixedは失敗
const BackGround = styled.div`
  width: ${window.outerWidth}px;
  height: ${window.outerHeight}px;
  position: fixed;
`

const MenuArea = styled.div`
  position: absolute;
  z-index: 1;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  background-color: gray;
  opacity: 0.95;
  border: solid 1px black;
`
const MenuItem = styled.div`
  &:hover {
    background-color: ${props => props.color};
  }
`

const ContextMenu: React.FC<{ whenClose: () => void, receiveChoice: (i: number) => void, pos: { x: number, y: number }, choice: [string, number, string?][] }> = ({ whenClose, receiveChoice, pos, choice }) => {
  // const [visible, setVisible] = React.useState(false)
  const onClick = (i: number) => () => {
    receiveChoice(i)
    whenClose()
  }
  return ReactDom.createPortal(
    <>
      <MenuArea {...pos}>
        {choice.map(([name, num, color]) => <MenuItem key={num} color={color || 'silver'} onClick={onClick(num)}>{name}</MenuItem>)}
      </MenuArea>
      <BackGround onClick={whenClose}></BackGround>
    </>, document.getElementById("context-menu")
  )
}

export default ContextMenu