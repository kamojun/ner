import React, { useEffect } from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from '../context'
import { TagSpan } from './tag'
import Modal from './modal'
import ContextMenu from './contextmenu'

const A = styled.a`
  display: block;
  font-size: 10;
  white-space: nowrap;
`

const Tagged: React.FC<{ snum: number, tnum: number, startposition: number, tag: string | null, children: string }> = ({ snum, tnum, startposition, tag, children }) => {
  const { state: { tags, tagcolors }, dispatch } = React.useContext(RootContext)
  const [showModal, setShowModal] = React.useState(false)
  const [showContextMenu, setShowContextMenu] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [selection, setSelection] = React.useState('')
  const [selectAB, setSelectAB] = React.useState({ a: -1, b: -1 })
  const onClick = (e: MouseEvent) => {
    e.altKey ?
      dispatch({ type: 'deleteTag', snum, tnum }) :
      dispatch({ type: 'switch', snum, tnum, tag: tags[(tags.findIndex(t => t === tag) + 1) % tags.length] })
  }
  const onModalClick = (i: number) => (e: MouseEvent) => {
    dispatch({ type: 'addTag', snum, ...selectAB, tag: tags[i] })
  }
  const AddTag = (e: MouseEvent) => {
    const s = window.getSelection()
    if (s.anchorNode !== s.focusNode) return;
    const [a, b] = [s.anchorOffset, s.focusOffset].map(x => x + startposition)
    if (a === b) return;
    if (e.button === 0) {  // 左クリックで操作した時
      if (e.altKey) {
        dispatch({ type: 'addTag', snum, a, b, tag: tags[0] })
      } else {
        setSelectAB({ a, b })
        setPosition({ x: e.pageX, y: e.pageY })
        setSelection(children.slice(s.anchorOffset, s.focusOffset))
        setShowContextMenu(true)
      }
    } else if (e.button === 2 && !showContextMenu) {  // 右クリックで一発確定
      dispatch({ type: 'addTag', snum, a, b, tag: tags[0] })
    }
  }
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    setSelection(children)
    setPosition({ x: e.pageX, y: e.pageY })
    setShowContextMenu(true)
    return false
  }
  const ReceiveChoiceWithTagged = (i: number) => {
    switch (i) {
      case -1:
        dispatch({ type: 'deleteTag', snum, tnum });
      default: {
        0 <= i && i < tags.length && dispatch({ type: 'switch', snum, tnum, tag: tags[i] })
      }
    }
  }
  const ReceiveChoiceWithNullTag = (i: number) => {
    dispatch({ type: 'addTag', snum, ...selectAB, tag: tags[i] })
  }
  const choice = [['削除', -1]].concat(tags.map((tag, i) => [tag, i, tagcolors.get(tag), `${i + 1}`]))
  const nullTagChoice = tags.map((tag, i) => [tag, i, tagcolors.get(tag), `${i + 1}`])
  return (
    <>
      {tag === null ?
        <TagSpan onContextMenu={e => e.preventDefault()} onMouseUp={tags.length > 0 ? AddTag : null}>{children}</TagSpan> :
        <TagSpan tag={tag} onClick={onClick} onContextMenu={onContextMenu}>{children}</TagSpan>
      }
      {showContextMenu &&
        <ContextMenu
          pos={position}
          whenClose={() => setShowContextMenu(false)}
          receiveChoice={tag === null ? ReceiveChoiceWithNullTag : ReceiveChoiceWithTagged}
          choice={tag === null ? nullTagChoice as [string, number, string?, string?][] : choice as [string, number, string?, string?][]}
        >
          <A onClick={(e) => e.stopPropagation()} href={`https://ja.wikipedia.org/wiki/${selection}`} target="_blank">wikiで検索</A>
          <A onClick={(e) => e.stopPropagation()} href={`https://www.google.com/search?q=${selection}`} target="_blank">googleで検索</A>
        </ContextMenu>}
      {/* {showModal &&
        <Modal whenClose={() => setShowModal(false)} handleKeyPress={handleKeyPress}>
          <div>{selection}</div>
          <a onClick={(e) => e.stopPropagation()} href={`https://ja.wikipedia.org/wiki/${selection}`} target="_blank">wikiで検索</a>
          <br></br>
          <a onClick={(e) => e.stopPropagation()} href={`https://www.google.com/search?q=${selection}`} target="_blank">googleで検索</a>
          {tags.map((tag, i) => <ModalChoice key={i} color={tagcolors.get(tag)} onClick={onModalClick(i)}>{`${i + 1}: ${tag}`}</ModalChoice>)}
        </Modal>
      } */}
    </>
  )
}

export default Tagged