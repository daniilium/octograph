import styled from 'styled-components'

const justifyContent: { [key: string]: string } = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
}

const alignItems = justifyContent

export const Stack = styled.div<{
  gap?: string
  direction?: 'column' | 'row'
  content?: 'left' | 'center' | 'right' | 'between'
  align?: 'left' | 'center' | 'right'
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  gap: ${({ gap }) => gap && gap};
  justify-content: ${({ content }) => content && justifyContent[content]};
  align-items: ${({ align }) => align && alignItems[align]};
`
