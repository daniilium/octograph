import styled from 'styled-components';

import { colors } from 'config/theme';

import { MainText } from 'components/atoms';

export const InfoPin = styled(MainText)`
  position: relative;
  padding-left: 12px;
  color: ${colors.gray};

  &:before {
    position: absolute;
    top: 3px;
    left: 0px;
    content: '•';
  }
`;
