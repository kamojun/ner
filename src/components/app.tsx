import React, { useReducer, useState, useContext } from 'react'
import Export from './export'
import FileLoad from './fileload'
import TextArea from './textarea'
import Tag from './tag'
import { Provider, RootContext } from './context'

const initialState = "肩が痛い";
// const reducer = (state, action) => (
//   action.type === 'set' ?
//     action.text.split('\n\n') :
//     state
// )

const App = () => {
  const { state: { sentences, tags } } = useContext(RootContext)
  return (
    <>
      <h3>NER</h3>
      <FileLoad></FileLoad>
      {sentences.length > 0 ? <Export></Export> : null}
      <div>
        <Tag color={"rgba(100, 100, 100, 0.3)"}>タグ作成</Tag>
        {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
      </div>
      <TextArea {...{ sentences }}></TextArea>
    </>
  )
}
export default App