import React, { useState } from 'react';
import styled from 'styled-components';
import { RootContext, IAction } from './context'

const Wrapper = styled.div`
  display: flex;
`;
const Label = styled.label`
  
`;
const Input = styled.input`
  display: none;
`;
const FileName = styled.p`
  
`;

const onChange = (event, cb, setFileName) => {
  cb(event);
  const targetName = event.target.files.item(0).name;
  setFileName(targetName);
};

const FileLoad = () => {
  const { state, dispatch } = React.useContext(RootContext)
  return (
    <input type="file" onChange={async e => {
      e.preventDefault()
      const reader = new FileReader()
      const text: string = await new Promise((resolve) => {
        reader.readAsText(e.target.files[0])
        reader.onload = () => resolve(reader.result as string)
      })
      dispatch({ type: "load", text })
    }}></input>
  )
}

export default FileLoad;