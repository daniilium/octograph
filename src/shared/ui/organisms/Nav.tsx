import styled from 'styled-components'

import { Link } from '@/shared/ui/atoms'

const NavContainer = styled.nav`
  display: flex;
  gap: 16px;

  padding: 21px;
  width: 100%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
`

type NavProps = {
  isAuth: boolean
}

export const Nav = (props: NavProps) => {
  const { isAuth } = props

  return (
    <NavContainer className="safari_only">
      <Link to="/">Home</Link>

      {isAuth ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/pages">Pages</Link>
        </>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </NavContainer>
  )
}
