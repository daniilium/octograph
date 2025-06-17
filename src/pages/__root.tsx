import { Nav } from '@/shared/ui/organisms/Nav'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import styled from 'styled-components'
import { useGlobalContext } from '@/shared/model/GlobalContext'
import { existToken } from '@/features/auth-token'
import { authGuard } from '@/features/auth-guard/lib/authGuard'
import { useEffect } from 'react'

const ContentContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;

  padding: 21px;
  width: 100%;
  min-height: 100%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAnonUser = !existToken()

    authGuard(location, isAnonUser)
  },
  component: () => <Layout />,
})

function Layout() {
  const { isAuth, changeIsAuth } = useGlobalContext()
  useEffect(() => {
    changeIsAuth(existToken())
  })

  return (
    <LayoutContainer>
      <ContentContainer>
        {/* <Outlet context={{ GlobalStore, setGlobalStore }} /> */}
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </ContentContainer>

      <Nav isAuth={isAuth} />
    </LayoutContainer>
  )
}
