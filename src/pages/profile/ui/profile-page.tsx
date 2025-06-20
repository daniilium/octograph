import { useState } from 'react'

import { Link } from '@/shared/ui/atoms/link'
import { InfoPin } from '@/shared/ui/atoms/info-pin'
import { Stack } from '@/shared/ui/templates/stack'

import { ProfileForm } from './profile-form'

export function ProfilePage() {
  const [authUrl, setAuthUrl] = useState<string>()

  return (
    <Stack gap="16px">
      <ProfileForm {...{ setAuthUrl }} />

      <hr />

      <Stack>
        <Link to={authUrl} target="_blank">
          Authorize a browser on telegra.ph
        </Link>
        <InfoPin>link is valid for 5 minutes</InfoPin>
        <InfoPin>refreshing the page creates a new link</InfoPin>
      </Stack>

      <Link to="/token">Management token</Link>

      <Link to="/logout">Logout</Link>
    </Stack>
  )
}
