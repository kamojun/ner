import React from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from '../context'
import { TagSpan } from './tag'
import Modal from './modal'

const Div = styled.div`
  display: inline-block;
`
const ModalChoice = styled.div`
  border: thin solid black;
  border-radius: 3px;
  background-color:  ${props => props.color};
  margin: 5px;
  &:hover {
    border: medium solid black

  }
`

const Tagged: React.FC<{ sentenceNum: number, blockNum: number, str: NamedEntity }> = ({ sentenceNum, blockNum, str: { content, tag } }) => {
  const { state: { tags, tagcolors }, dispatch } = React.useContext(RootContext)
  const [showModal, setShowModal] = React.useState(false)
  const [selection, setSelection] = React.useState('')
  const [selectAB, setSelectAB] = React.useState([-1, -1])
  const onClick = (e: MouseEvent) => {
    e.altKey ?
      dispatch({
        type: 'deleteTag', snum: sentenceNum, bnum: blockNum,
      }) :
      dispatch({
        type: 'switch', snum: sentenceNum, bnum: blockNum, curtag: tag
      })
  }
  const onModalClick = (i: number) => (e: MouseEvent) => {
    dispatch({
      type: 'addTag', snum: sentenceNum, bnum: blockNum, a: selectAB[0], b: selectAB[1], newtag: tags[i]
    })
  }
  const AddTag = (e: MouseEvent) => {
    const s = window.getSelection()
    if (s.anchorNode !== s.focusNode) return;
    const [a, b] = [s.anchorOffset, s.focusOffset]
    if (a === b) return;
    if (e.altKey) {
      dispatch({ type: 'addTag', snum: sentenceNum, bnum: blockNum, a, b, newtag: tags[0] })
    } else {
      // これなんとかしたいな...
      setSelection(s.toLocaleString())
      setShowModal(true)
      setSelectAB([a, b])
    }
  }
  const handleKeyPress = (e: KeyboardEvent) => {
    const newtag = tags[Number(e.key) - 1]
    newtag !== undefined && dispatch({ type: 'addTag', newtag, snum: sentenceNum, bnum: blockNum, a: selectAB[0], b: selectAB[1] })
    setShowModal(false)
  }
  return (
    <Div>
      {tag === null ?
        <TagSpan onMouseUp={tags.length > 0 ? AddTag : null}>{content}</TagSpan> :
        <TagSpan tag={tag} onClick={onClick}>{content}</TagSpan>}
      {showModal &&
        <Modal whenClose={() => setShowModal(false)} handleKeyPress={handleKeyPress}>
          <div>{selection}</div>
          <a onClick={(e) => e.stopPropagation()} href={`https://ja.wikipedia.org/wiki/${selection}`} target="_blank">wikiで検索</a>
          <br></br>
          <a onClick={(e) => e.stopPropagation()} href={`https://www.google.com/search?q=${selection}`} target="_blank">googleで検索</a>
          {tags.map((tag, i) => <ModalChoice key={i} color={tagcolors.get(tag)} onClick={onModalClick(i)}>{`${i + 1}: ${tag}`}</ModalChoice>)}
        </Modal>
      }
    </Div>
  )
}

export default Tagged