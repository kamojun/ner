import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

const BackGround = styled.div`
  width: ${window.outerWidth}px;
  height: ${window.outerHeight}px;
  position: fixed;
  z-index: 150;
`

const ContentArea = styled.div`
  position: fixed;
  z-index: 200;
  background-color: silver;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  opacity: 0.95;
  border: solid 1px black;
`
type Props = {
  whenClose: () => void,
  position?: { x: Number, y: Number }
}
const Modal: React.FC<Props> = ({ whenClose, position, children }) => {
  const pos = position || { x: 0, y: 0 }
  return ReactDom.createPortal(
    <>
      <ContentArea {...position}>{children}</ContentArea>
      <BackGround onClick={(e: MouseEvent) => { e.stopPropagation(); whenClose(); }}></BackGround>
    </>, document.getElementById("context-menu")
  )
}
const Div = styled.div`
  border: 1px solid #000;
  white-space: pre-wrap;
  margin: auto;
  width: 300px;
  height: 200px;
  overflow: scroll;
  font-size: small;
`
const ModalInfo: React.FC<{ info: string }> = ({ info, children }) => {
  const [showModal, setShowModal] = React.useState(false)
  const [position, setPosition] = React.useState<{ x: Number, y: Number } | null>(null)
  return <span onClick={(e) => { setPosition({ x: e.clientX, y: e.clientY }); console.log("spanclick"); setShowModal(!showModal); }}>
    {children}
    {showModal && <Modal {...{ position }} whenClose={() => { console.log('clickmodal'); setShowModal(false) }}><Div>{info}</Div></Modal>
    }
  </span >
}

export { Modal, ModalInfo }