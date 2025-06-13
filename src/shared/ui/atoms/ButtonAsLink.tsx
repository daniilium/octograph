import styled from 'styled-components';

import { colors, fonts } from '@/shared/config/theme';

export const ButtonAsLink = styled.button`
  display: inline-block;
  outline: none;
  border: none;
  background-color: transparent;

  text-align: left;
  cursor: pointer;
  font-family: ${fonts.main};
  color: ${colors.black};
  font-size: 18px;
  text-decoration: underline;
`;
