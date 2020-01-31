import React, { useReducer, useState, useContext } from 'react'
import Export from './export'
import SwitchDisplay from './switch_display'
import { FileLoad, LabelLoad } from './fileload'
import TextArea from './textarea'
// import TagCreateTag from './create_tag'
import { TagSpan } from './tag'
import { Provider, RootContext } from '../context'


const App = () => {
  const { state: { sentences, tags, message } } = useContext(RootContext)
  const tagtext = tags.join('\n')
  const rawtext = sentences.map(
    sentence => sentence.map(
      ({ content, tag }) => `${content}\t${tag || 'O'}`
    ).join('\n')
  ).join('\n\n') + '\n\n'
  return (
    <>
      <h3>NER</h3>
      <h4>{message}</h4>
      <LabelLoad></LabelLoad>
      {tags.length > 0 ? <SwitchDisplay text={tagtext}>{"テキスト表示"}</SwitchDisplay> : null}
      <br></br>
      <FileLoad></FileLoad>
      {sentences.length > 0 ? <SwitchDisplay text={rawtext}>{"テキスト表示"}</SwitchDisplay> : null}
      {sentences.length > 0 ? <Export text={rawtext}></Export> : null}
      <div>
        <span>ラベル
        </span>
        {tags.map((tag, i) => <TagSpan key={i} tag={tag}></TagSpan>)}
      </div>
      <TextArea {...{ sentences }}></TextArea>
    </>
  )
}
export default App