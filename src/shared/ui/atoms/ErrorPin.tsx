import styled from 'styled-components';

import { colors } from '@/shared/config/theme';

import { InfoPin } from '@/shared/ui/atoms';

export const ErrorPin = styled(InfoPin)`
  color: ${colors.red};
`;
