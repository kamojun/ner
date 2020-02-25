import React from 'react'
import { useRootContext } from '../context'
import styled from 'styled-components'

const Span = styled.span`
  margin: 2px;
  background-color:  ${props => props.color};
  border-radius: 3px;
`

const TagSpan: React.FC<{ color?: string, tag?: string, [s: string]: any }> = ({ color, tag, children, ...otherprops }) => {
  const { state: { tagcolors } } = useRootContext()
  return (
    <Span {...otherprops} color={color || tagcolors.get(tag)}>{children || tag}</Span>
  )
}
export { TagSpan }


