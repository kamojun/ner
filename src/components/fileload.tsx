import React, { useState } from 'react';
import styled from 'styled-components';
import { RootContext } from '../context'

// const load()
const demotext = "今日\tTAG1\nは\nいい天気\tTAG2\nです。\n\n明日\tTAG1\nは\n雪が降る\tTAG2\nでしょう"
const FileLoad = () => {
  const { state: { filename }, dispatch } = React.useContext(RootContext)
  return (<>
    <label>{"データ"}</label>
    {!filename ?
      <>
        <input type="file" onChange={async e => {
          e.preventDefault()
          const reader = new FileReader()
          let filename: string
          const text: string = await new Promise((resolve) => {
            filename = e.target.files[0].name
            reader.readAsText(e.target.files[0])
            reader.onload = () => resolve(reader.result as string)
          })
          dispatch({ type: "load", text, filename })
        }}></input>
        <span>デモ -></span>
        <button onClick={() => dispatch({ type: "load", text: demotext, filename: "demo" })}>demo</button>
      </> : <span style={{ margin: 10 }}>{filename}</span>}
  </>)
}
// const demolabel = "TAG1\trgba(255, 0, 0, 0.3)\nTAG2\trgba(0, 255, 0, 0.3)"
const demolabel = "TAG1\nTAG2\nTAG3"
const LabelLoad = () => {
  const { state: { tags }, dispatch } = React.useContext(RootContext)
  return (<>
    <label>{"ラベル"}</label>
    <input type="file" onChange={async e => {
      e.preventDefault()
      const reader = new FileReader()
      const text: string = await new Promise((resolve) => {
        reader.readAsText(e.target.files[0])
        reader.onload = () => resolve(reader.result as string)
      })
      dispatch({ type: "loadLabel", text })
    }}></input>
    {tags.length === 0 ?
      <>
        <span>デモ -></span>
        <button onClick={() => dispatch({ type: "loadLabel", text: demolabel })}>demo</button></> : null}
  </>)
}

export { FileLoad, LabelLoad };