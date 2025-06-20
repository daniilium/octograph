import { styled } from 'styled-components'

export const Group = styled.div<{
  position?: 'left' | 'center' | 'right' | 'apart'
  grow?: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => {
    const position = props.position
    if (position === 'left') return 'start'
    if (position === 'center') return 'center'
    if (position === 'right') return 'end'
    if (position === 'apart') return 'space-between'
  }};

  gap: 10px;

  * {
    flex-grow: ${(props) => props.grow && 1};
  }
`
