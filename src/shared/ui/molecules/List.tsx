import { ReactNode } from 'react'

import { Stack } from '@/shared/ui/templates/stack'

interface ChildrenProps {
  children: ReactNode
}

export const List = ({ children }: ChildrenProps) => {
  return <Stack>{children}</Stack>
}
