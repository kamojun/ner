import React from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from './context'
import { TagSpan } from './color'

const Tagged: React.FC<{ sentenceNum: number, blockNum: number, str: NamedEntity }> = ({ sentenceNum, blockNum, str: { content, tag } }) => {
  const { dispatch } = React.useContext(RootContext)
  if (tag === null) {
    return <TagSpan
      onMouseUp={(e) => {
        const s = window.getSelection()
        /// 同じNE上でやること
        if (s.anchorNode !== s.focusNode) {
          return
        }
        const [a, b] = [s.anchorOffset, s.focusOffset]
        /// 本当に何か選択されていること
        if (a === b) {
          return
        }
        dispatch({ type: 'tag', text: `${String(sentenceNum)} ${String(blockNum)} ${a} ${b}\tTAG2` })
      }
      }
    >{content}
    </TagSpan>
  } else {
    return (
      <TagSpan
        color={tag}
        onClick={() => {
          dispatch({
            type: 'switch', text: `${String(sentenceNum)} ${String(blockNum)}\t${tag}`
          })
        }}
      >{content}
      </TagSpan>
    )
  }
}

export default Tagged