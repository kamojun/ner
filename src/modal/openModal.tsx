import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { RootContext } from '../context'
import styled from 'styled-components'

const DivModal = styled.div`
  background: rgba(0,0,0,0.3);
  width: 120%;
  height: 120%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`
const ModalContent = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background: white;
  transform: translateX(-50%) translateY(-50%);
`

const OpenModal = () => {
  const [isModalOpen, setModal] = React.useState(false)
  return (
    <div onClick={() => setModal(!isModalOpen)}>
      <span>モーダル表示</span>
      {isModalOpen && <Modal whenClose={() => setModal(!isModalOpen)}>{"こんにちは"}</Modal>}
    </div>
  )
}

const Modal = ({ whenClose, children }) => {
  const { dispatch } = React.useContext(RootContext)
  const handlekeypress = (e) => {
    dispatch({ type: 'debug', anything: e.keyCode })
    whenClose()
  }
  useEffect(() => {
    document.addEventListener('keypress', handlekeypress)
    return () => document.removeEventListener('keypress', handlekeypress)
  })
  const left = window.innerWidth / 2
  const top = window.innerHeight / 2
  // return ReactDom.createPortal(
  //   <DivModal>modal!
  //     {children}
  //   </DivModal>,
  //   document.getElementById("modal-root")
  // )
  return (
    <DivModal>
      <ModalContent top={top} left={left}>{children}</ModalContent>
    </DivModal>
  )
}

export default OpenModal