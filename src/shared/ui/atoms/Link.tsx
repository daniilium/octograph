import { colors } from '@/shared/config/theme';
import { Link as RouterLink } from '@tanstack/react-router';
import { ComponentProps } from 'react';

export function Link(props: ComponentProps<typeof RouterLink>) {
  return (
    <RouterLink {...props} style={
      {
        fontSize: '18px',
        color: colors.black,
        textDecoration: 'underline',
      }
    }>{props.children}</RouterLink>
  );
}