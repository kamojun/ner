import React, { useEffect, ReactNode } from 'react'
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
  border-radius: 5px;
  padding: 10px;
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

const Modal: React.FC<{ whenClose: () => void, handleKeyPress?: (e: KeyboardEvent) => void }> = ({ whenClose, handleKeyPress, children }) => {
  const { state: { tags }, dispatch } = React.useContext(RootContext)
  // const handlekeypress = (e: KeyboardEvent) => {
  //   dispatch({ type: 'addTag', newtag: tags[Number(e.key)], snum, bnum, a, b })
  //   whenClose()
  // }
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
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
    <DivModal onClick={whenClose}>
      <ModalContent top={top} left={left}>{children}</ModalContent>
    </DivModal>
  )
}

// const useModal = () => {
//   const [showModal, setShowModal] = React.useState(false)
//   const openModal = () => setShowModal(true)
//   const closeModal = () => setShowModal(false)
//   return [openModal, closeModal]
// }

export default Modal