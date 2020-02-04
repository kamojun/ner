import React, { useState } from 'react';
import styled from 'styled-components';
import { RootContext } from '../context'

// const load()
// const demotext = "今日\tTAG1\nは\nいい天気\tTAG2\nです。\n\n明日\tTAG1\nは\n雪が降る\tTAG2\nでしょう\n\nいや、明日のことは何もわからない。"
const demotext = `近々結婚の予定で挙児を希望しているため、人間ドックでの指摘事項が気になり来院した。

45歳の時にも高血圧を指摘され2年間降圧薬を内服したが、その後は内服していなかった。
Time 0 6

2週前に感冒様症状を自覚し、その後、湿性咳嗽、喘鳴および呼吸困難が持続するため受診した。
Pos 4 9
Pos 18 22
Pos 23 25
Pos 28 32`
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
const demolabel = "Time\nPos\n"
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