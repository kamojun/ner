import React, { Key } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

const BackGround = styled.div`
  width: ${window.outerWidth}px;
  height: ${window.outerHeight}px;
  position: fixed;
`

const MenuArea = styled.div`
  position: absolute;
  z-index: 300;
  top: ${props => props.y - 50}px;
  left: ${props => props.x}px;
  background-color: silver;
  opacity: 0.95;
  border: solid 1px black;
  display: flex;
  flex-direction: column${props => props.reverse ? "-reverse" : ""};
  flex-wrap: wrap;
`
const MenuItem = styled.div`
  &:hover {
    background-color: ${props => props.color};
  }
`
type Props = {
  whenClose: () => void,
  receiveChoice: (i: number) => void,
  pos: { x: number, y: number },
  choice: [string, number, string?, string?][],
  // handleKeyPress?: (e: KeyboardEvent) => void
}
const ContextMenu: React.FC<Props> = ({ whenClose, receiveChoice, pos, choice, children }) => {
  // const [visible, setVisible] = React.useState(false)
  const setOnClick = (i: number) => () => {
    receiveChoice(i)
    whenClose()
  }
  const handleKeyPress = (e: KeyboardEvent) => {
    const chosen = choice.flatMap(([_, i, __, shortcut]) => e.key === shortcut ? [i] : [])
    chosen.length > 0 && setOnClick(chosen[0])()
  }
  React.useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  })
  return ReactDom.createPortal(
    <>
      <MenuArea {...pos}>
        {choice.map(([name, num, color, shortcut]) =>
          <MenuItem key={num} color={color || 'white'} onClick={setOnClick(num)}>
            <div style={{ textAlign: "left", width: "49%", display: "inline-block" }}>{name}</div>
            {shortcut && <div style={{ textAlign: "right", width: "50%", display: "inline-block" }}>({shortcut})</div>}
          </MenuItem>)}
        {React.Children.map(children, (item, i) => <MenuItem key={i} color="white">{item}</MenuItem>)}
      </MenuArea>
      <BackGround onClick={whenClose}></BackGround>
    </>, document.getElementById("context-menu")
  )
}

export default ContextMenu