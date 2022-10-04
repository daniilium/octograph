import styled from 'styled-components';

import { colors } from '../../theme';

export const Button = styled.button`
  cursor: pointer;
  height: 39px;
  padding: 8px 16px 6px 16px;

  display: inline-block;
  background-color: white;
  border: 2px solid ${colors.black};
  border-radius: 18px;

  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: ${colors.black};

  &:active {
    transform: translate(0, 2px);
  }
`;
