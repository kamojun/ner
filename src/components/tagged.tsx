import React from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from '../context'
import { TagSpan } from './tag'
import Modal from './modal'

const Div = styled.div`
  display: inline-block;
`

const ModalChoice = styled.div`
  background-color: ${props => props.color}; 
  /* border: 2px solid ${props => props.color}; */
  border-radius: 10px;
  margin: 0 10px;
  color: white;
  &:hover {
    opacity: 0.8; 
  }
`

const Tagged: React.FC<{ snum: number, tnum: number, startposition: number, tag: string | null, children: string }> = ({ snum, tnum, startposition, tag, children }) => {
  const { state: { tags, tagcolors }, dispatch } = React.useContext(RootContext)
  const [showModal, setShowModal] = React.useState(false)
  const [selection, setSelection] = React.useState('')
  const [selectAB, setSelectAB] = React.useState({ a: -1, b: -1 })
  const onClick = (e: MouseEvent) => {
    e.altKey ?
      dispatch({ type: 'deleteTag', snum, tnum }) :
      dispatch({ type: 'switch', snum, tnum, curtag: tag })
  }
  const onModalClick = (i: number) => (e: MouseEvent) => {
    dispatch({ type: 'addTag', snum, ...selectAB, tag: tags[i] })
  }
  const AddTag = (e: MouseEvent) => {
    const s = window.getSelection()
    if (s.anchorNode !== s.focusNode) return;
    const [a, b] = [s.anchorOffset, s.focusOffset].map(x => x + startposition)
    if (a === b) return;
    if (e.button === 0) {  // 左クリック
      if (e.altKey) {
        dispatch({ type: 'addTag', snum, a, b, tag: tags[0] })
      } else {
        // これなんとかしたいな...
        setSelection(s.toLocaleString())
        setShowModal(true)
        setSelectAB({ a, b })
      }
    } else if (e.button === 2) {  // 右クリック
      dispatch({ type: 'addTag', snum, a, b, tag: tags[0] })
    }
  }
  const handleKeyPress = (e: KeyboardEvent) => {
    const newtag = tags[Number(e.key) - 1]
    newtag !== undefined && dispatch({ type: 'addTag', tag: newtag, snum, ...selectAB })
    setShowModal(false)
  }
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    console.log('contextmenu!')
  }
  return (
    <>
      {tag === null ?
        <TagSpan onMouseUp={tags.length > 0 ? AddTag : null} onContextMenu={onContextMenu}>{children}</TagSpan> :
        <TagSpan tag={tag} onClick={onClick}>{children}</TagSpan>}
      {showModal &&
        <Modal whenClose={() => setShowModal(false)} handleKeyPress={handleKeyPress}>
          <div>{selection}</div>
          <a onClick={(e) => e.stopPropagation()} href={`https://ja.wikipedia.org/wiki/${selection}`} target="_blank">wikiで検索</a>
          <br></br>
          <a onClick={(e) => e.stopPropagation()} href={`https://www.google.com/search?q=${selection}`} target="_blank">googleで検索</a>
          {tags.map((tag, i) => <ModalChoice key={i} color={tagcolors.get(tag)} onClick={onModalClick(i)}>{`${i + 1}: ${tag}`}</ModalChoice>)}
        </Modal>
      }
    </>
  )
}

export default Tagged