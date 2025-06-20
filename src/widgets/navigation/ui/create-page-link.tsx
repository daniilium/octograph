import { getToken } from '@/features/auth-token'
import { useAutoRefreshCreatePageLink } from '../model/use-auto-refresh-create-page-link'

import { Link } from '@/shared/ui/atoms/link'

export function CreatePageLink() {
  const token = getToken()
  const { link } = useAutoRefreshCreatePageLink({ token: token ?? '' })

  return <Link to={link}>Create page</Link>
}
