import { Link } from '@/shared/ui/atoms/link'

import { useGlobalContext } from '@/shared/model/global-context'

import { NavContainer } from './nav-container'
import { CreatePageLink } from './create-page-link'

export const Navigation = () => {
  const { isAuthenticated } = useGlobalContext()

  return (
    <NavContainer>
      <Link to="/">Home</Link>

      {isAuthenticated && (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/pages">Pages</Link>
          <div style={{ marginLeft: 'auto' }}>
            <CreatePageLink />
          </div>
        </>
      )}

      {!isAuthenticated && <Link to="/login">Sign in</Link>}
    </NavContainer>
  )
}
