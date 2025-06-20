import { useEffect } from 'react'

import { getToken } from '@/features/auth-token'

import { useGlobalContext } from '@/shared/model/global-context'
import { ButtonAsLink } from '@/shared/ui/atoms/button-as-link'
import { InfoPin } from '@/shared/ui/atoms/info-pin'
import { Stack } from '@/shared/ui/templates/stack'

import CopyIcon from '/copy.svg'
import { RevokeToken } from './revoke-token'

export function TokenPage() {
  const { setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Warning',
      subtitle: 'Management token',
    })
  }, [])

  const copyToken = () => {
    const token = getToken()

    if (token) navigator.clipboard.writeText(token)
    return
  }

  const copyLink = () => {
    const token = getToken()
    const link = `${window.location.origin}/login/${token}`
    if (token) navigator.clipboard.writeText(link)
    return
  }

  return (
    <Stack gap="16px">
      <Stack>
        <ButtonAsLink onClick={copyToken}>
          <img
            style={{ width: '16px', height: '16px' }}
            src={CopyIcon}
            alt="Copy Icon"
          />
          Copy token
        </ButtonAsLink>
        <InfoPin>
          transferring the token to third parties may result in the loss of
          account management
        </InfoPin>
      </Stack>

      <Stack>
        <ButtonAsLink onClick={copyLink}>
          <img
            style={{ width: '16px', height: '16px' }}
            src={CopyIcon}
            alt="Copy Icon"
          />
          Copy the login link
        </ButtonAsLink>

        <InfoPin>contains a token in the link</InfoPin>
      </Stack>

      <RevokeToken />
    </Stack>
  )
}
