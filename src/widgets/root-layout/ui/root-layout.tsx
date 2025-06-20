import { ElementType, useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { existToken } from '@/features/auth-token'

import { useGlobalContext } from '@/shared/model/global-context'

import { LayoutContainer } from './layout-container'
import { ContentContainer } from './content-container'

type Props = {
  Header: ElementType
  Navigation: ElementType
}

export function RootLayout({ Header, Navigation }: Props) {
  const { setAuthenticated } = useGlobalContext()

  useEffect(() => {
    setAuthenticated(existToken())
  })

  return (
    <LayoutContainer>
      <ContentContainer>
        <Header />

        <Outlet />
      </ContentContainer>

      <Navigation />

      {import.meta.env.DEV && <TanStackRouterDevtools position="top-right" />}
    </LayoutContainer>
  )
}
