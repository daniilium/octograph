import { Link } from '@/shared/ui/atoms/Link'

import { NavContainer } from './nav-container'
import { useGlobalContext } from '@/shared/model/global-context'

export const Navigation = () => {
  const { isAuthenticated } = useGlobalContext()

  return (
    <NavContainer>
      <Link to="/">Home</Link>

      {isAuthenticated ? (
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
