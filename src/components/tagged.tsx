import React from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from '../context'
import { TagSpan } from './tag'

const Tagged: React.FC<{ sentenceNum: number, blockNum: number, str: NamedEntity }> = ({ sentenceNum, blockNum, str: { content, tag } }) => {
  const { state: { tags }, dispatch } = React.useContext(RootContext)
  const SwitchTag = () => {
    dispatch({
      type: 'switch', snum: sentenceNum, bnum: blockNum, curtag: tag
    })
  }
  const AddTag = (e: MouseEvent) => {
    const s = window.getSelection()
    if (s.anchorNode !== s.focusNode) return;
    const [a, b] = [s.anchorOffset, s.focusOffset]
    if (a === b) return;
    let newtag: string | null = null
    if (e.shiftKey) {
      newtag = tags[0]
    } else if (e.altKey) {
      newtag = tags[1]
    }
    if (newtag) {
      // setHover(true)
      dispatch({ type: 'addTag', snum: sentenceNum, bnum: blockNum, a, b, newtag })
    } else {
      // setSh(true)
    }
  }
  return tag === null ?
    <TagSpan onMouseUp={tags.length > 0 ? AddTag : null}>{content}</TagSpan> :
    <TagSpan tag={tag} onClick={SwitchTag}>{content}</TagSpan>
}

export default Tagged