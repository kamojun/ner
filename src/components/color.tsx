import React from 'react'
import { RootContext } from '../context'
import styled from 'styled-components'

const Span = styled.span`
  margin: 5px;
  background-color:  ${props => props.color};
  border-radius: 3px;
`
const TagSpan = ({ tag, color, ...props }: { tag: string, color?: string }) => {
  const { state: { tagcolors } } = React.useContext(RootContext)
  const hue = (parseInt([...(new TextEncoder).encode(tag)].map(String).join('')) % 3600) / 10
  const _color = tagcolors.has(tag) ? tagcolors.get(tag) : `hsla(${hue}, 80%, 60%, 0.3)`
  return (
    <Span {...props} color={color || _color}></Span>
  )

}

export { TagSpan }