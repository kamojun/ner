import React from 'react'
import { useRootContext } from '../context'
import styled from 'styled-components'

const Span = styled.span`
  margin: 2px;
  background-color:  ${props => props.color};
  border-radius: 3px;
`

const TagSpan = (props) => {
  const { state: { tagcolors } } = useRootContext()
  const { color, transparnt, tag, children, ...otherprops } = props   // 型がわからん...
  return (
    <Span {...otherprops} color={color || tagcolors.get(tag)}>{children || tag}</Span>
  )
}

export { TagSpan }

