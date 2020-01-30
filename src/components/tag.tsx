import React from 'react'
import { TagSpan } from './color'

const Tag = ({ children, color }: { children: string, color?: string }) => (
  <TagSpan color={color || children}>{children}</TagSpan>
)

export default Tag

