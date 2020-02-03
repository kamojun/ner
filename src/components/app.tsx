import React, { useReducer, useState, useContext } from 'react'
import Export from './export'
import SwitchDisplay from './switch_display'
import { FileLoad, LabelLoad } from './fileload'
import TextArea from './textarea'
// import TagCreateTag from './create_tag'
import { TagSpan } from './tag'
import { RootContext } from '../context'
import styled from 'styled-components'

const Header = styled.div`
    background: #fff;
    position: fixed;
    z-index: 100;
    width: 100%;
    padding: 10px;
`

const App = () => {
  const modalstate = useState(false)
  const { state: { sentences, tags, message, filename, labelrawtext, entries } } = useContext(RootContext)
  const rawtext = sentences.map(
    sentence => sentence.map(
      ({ content, tag }) => `${content}\t${tag || 'O'}`
    ).join('\n')
  ).join('\n\n') + '\n\n'
  return (
    <>
      <Header>
        <h4>NER</h4>
        <p>{message}</p>
        <LabelLoad></LabelLoad>
        {tags.length > 0 ? <SwitchDisplay text={labelrawtext}>{"テキスト表示"}</SwitchDisplay> : null}
        <br></br>
        <FileLoad></FileLoad>
        {sentences.length > 0 ? <SwitchDisplay text={rawtext}>{"テキスト表示"}</SwitchDisplay> : null}
        {sentences.length > 0 ? <Export filename={filename || "unknown.txt"} text={rawtext}></Export> : null}
        <div>
          <span>ラベル</span>
          {tags.map((tag, i) => <TagSpan key={i} tag={tag}></TagSpan>)}
        </div>
      </Header>
      <TextArea {...{ sentences, entries }}></TextArea>

    </>
  )
}
export default App