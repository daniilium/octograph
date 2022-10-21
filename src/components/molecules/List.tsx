import { ReactNode } from 'react';

import { MainText } from 'components/atoms';
import { Stack } from 'components/templates';

interface ChildrenProps {
  children: ReactNode;
}

export const List = ({ children }: ChildrenProps) => {
  return <Stack>{children}</Stack>;
};

export const ListItem = ({ children }: ChildrenProps) => {
  return <MainText style={{ paddingLeft: 16, fontSize: 14 }}>{children}</MainText>;
};
