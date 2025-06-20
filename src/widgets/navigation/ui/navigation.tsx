import { Link } from '@/shared/ui/atoms/Link'

import { NavContainer } from './nav-container'

type NavProps = {
  isAuth: boolean
}

export const Navigation = (props: NavProps) => {
  const { isAuth } = props

  return (
    <NavContainer>
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
