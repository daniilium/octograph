import { styled } from 'styled-components'

import { colors } from '@/shared/config/theme'

import { Container } from './container'

export const ModalContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid ${colors.black};
  border-radius: 18px;
  background-color: white;

  padding: 16px 24px 8px 24px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
