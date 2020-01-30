import React, { useState } from 'react';
import styled from 'styled-components';
import { RootContext } from '../context'

const FileLoad = () => {
  const { state, dispatch } = React.useContext(RootContext)
  const disabled = state.tags.length === 0 || state.sentences.length > 0
  return (
    <>
      <label>{"データ"}</label>
      <input disabled={disabled} type="file" onChange={async e => {
        e.preventDefault()
        const reader = new FileReader()
        const text: string = await new Promise((resolve) => {
          reader.readAsText(e.target.files[0])
          reader.onload = () => resolve(reader.result as string)
        })
        dispatch({ type: "load", text })
      }}></input>
      <button
        disabled={disabled}
        onClick={() => dispatch({ type: "load", text: "今日\tTAG1\nは\nいい天気\tTAG2\nです。\n\n明日\tTAG1\nは\n雪が降る\tTAG2\nでしょう" })}>demo</button>
    </>
  )
}

const LabelLoad = () => {
  const { state, dispatch } = React.useContext(RootContext)
  return (
    <>
      <label>{"ラベル"}</label>
      <input
        disabled={state.tags.length > 0}
        type="file"
        onChange={async e => {
          e.preventDefault()
          const reader = new FileReader()
          const text: string = await new Promise((resolve) => {
            reader.readAsText(e.target.files[0])
            reader.onload = () => resolve(reader.result as string)
          })
          dispatch({ type: "loadLabel", text })
        }} ></input>
      <button
        disabled={state.tags.length > 0}
        onClick={() => dispatch({ type: "loadLabel", text: "TAG1\nTAG2" })}>demo</button>
    </>
  )
}

export { FileLoad, LabelLoad };