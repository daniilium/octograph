import { createRootRoute } from '@tanstack/react-router'

import { existToken } from '@/features/auth-token'
import { authGuard } from '@/features/auth-guard'

import { Navigation } from '@/widgets/navigation'
import { Header } from '@/widgets/header'

import { RootLayout } from '@/widgets/root-layout'
import RootErrorBoundary from '@/widgets/root-error-boundary'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAnonUser = !existToken()

    authGuard(location, isAnonUser)
  },
  component: () => (
    <RootErrorBoundary>
      <RootLayout Header={Header} Navigation={Navigation} />,
    </RootErrorBoundary>
  ),
})
