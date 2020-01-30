import styled from 'styled-components'

const tagColor = (tag?: string) => {
  switch (tag) {
    case 'TAG1':
      return "rgba(255, 0, 0, 0.3)"
    case 'TAG2':
      return 'rgba(0, 255, 0, 0.3)'
    case null:
      return null
    default:
      return tag
  }
}

const TagSpan = styled.span`
  margin: 5px;
  background-color:  ${props => tagColor(props.color) || "white"};
  color: ${props => tagColor(props.color) ? "black" : "black"};
  border-radius: 3px;
`

export { TagSpan }