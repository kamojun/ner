import React, { useReducer, useState, useContext } from 'react'
import Export from './export'
import FileLoad from './fileload'
import TextArea from './textarea'
import { Provider, RootContext } from './context'

const initialState = "肩が痛い";
// const reducer = (state, action) => (
//   action.type === 'set' ?
//     action.text.split('\n\n') :
//     state
// )

const App = () => {
  const { state: { sentences, loaded } } = useContext(RootContext)
  return (
    <>
      <h3>NER</h3>
      <FileLoad></FileLoad>
      {loaded ? <Export></Export> : null}
      <TextArea {...{ sentences }}></TextArea>
    </>
  )
}
export default App