import React from 'react'
import { RootContext } from '../context'
import styled from 'styled-components'

const Span = styled.span`
  margin: 5px;
  background-color:  ${props => props.color};
  border-radius: 3px;
`

const Div = styled.div`
  margin: 5px;
  background-color:  ${props => props.color};
  border-radius: 3px;
  display: inline-block;
`

const TagSpan = (props) => {
  const { state: { tagcolors } } = React.useContext(RootContext)
  const { color, tag, text, children, ...otherprops } = props   // 型がわからん...
  const hue = (parseInt([...(new TextEncoder).encode(tag)].map(String).join('')) * 20) % 360
  const _color = tagcolors.has(tag) ? tagcolors.get(tag) : `hsla(${hue}, 80%, 60%, 0.3)`
  return (
    <Div {...otherprops} color={color || _color} title={tag || text || "O"}>{children || text || tag}</Div>
  )
}

export { TagSpan }

