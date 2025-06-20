import { colors, fonts } from '@/shared/config/theme'
import { styled } from 'styled-components'

export const Input = styled.input<{ error?: object }>`
  border: 1px solid ${(props) => (props.error ? colors.red : colors.black)};
  border-radius: 18px;
  font-family: ${fonts.main};
  font-size: 18px;
  padding: 0 12px;
  height: 36px;

  &:focus {
    border: 2px solid ${(props) => (props.error ? colors.red : colors.black)};
    outline: none;
  }
`
