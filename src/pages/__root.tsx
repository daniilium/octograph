import { useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { existToken } from '@/features/auth-token'
import { authGuard } from '@/features/auth-guard'

import { Navigation } from '@/widgets/navigation'
import { Header } from '@/widgets/header'

import { useGlobalContext } from '@/shared/model/global-context'
import { ContentContainer } from '@/shared/ui/templates/content-container'
import { LayoutContainer } from '@/shared/ui/templates/layout-container'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAnonUser = !existToken()

    authGuard(location, isAnonUser)
  },
  component: LayoutRoot,
})

function LayoutRoot() {
  const { isAuth, changeIsAuth } = useGlobalContext()
  useEffect(() => {
    changeIsAuth(existToken())
  })

  return (
    <LayoutContainer>
      <ContentContainer>
        <Header />

        <Outlet />
      </ContentContainer>

      <Navigation isAuth={isAuth} />

      <TanStackRouterDevtools />
    </LayoutContainer>
  )
}
