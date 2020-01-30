import React from 'react'
import styled from 'styled-components'
import { RootContext, NamedEntity } from '../context'
import { TagSpan } from './color'

const Tagged: React.FC<{ sentenceNum: number, blockNum: number, str: NamedEntity }> = ({ sentenceNum, blockNum, str: { content, tag } }) => {
  const { state: { tags }, dispatch } = React.useContext(RootContext)
  if (tag === null && tags.length > 0) {
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
        dispatch({ type: 'tag', snum: sentenceNum, bnum: blockNum, a, b, newtag: tags[0] })
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
            type: 'switch', snum: sentenceNum, bnum: blockNum, curtag: tag
          })
        }}
      >{content}
      </TagSpan>
    )
  }
}

export default Tagged