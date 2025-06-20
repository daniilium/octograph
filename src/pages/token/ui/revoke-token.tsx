import { useEffect, useState } from 'react'

import { ModalDialog } from '@/shared/ui/organisms/modal-dialog'

import RevokeIcon from '/assets/revoke.svg'
import { Stack } from '@/shared/ui/templates/stack'
import { ButtonAsLink } from '@/shared/ui/atoms/ButtonAsLink'
import { InfoPin } from '@/shared/ui/atoms/InfoPin'
import { useRevokeToken } from '../model/use-revoke-token'
import { getToken, setToken } from '@/features/auth-token'

export function RevokeToken() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data: newToken, actionCallback: revokeToken } = useRevokeToken()

  const handleRevokeToken = () => {
    const token = getToken()
    if (!token) return

    revokeToken({ token })
  }

  useEffect(() => {
    if (newToken) {
      setToken(newToken.result.access_token)
      setIsOpenModal(false)
    }
  }, [newToken])

  return (
    <>
      <Stack>
        <ButtonAsLink onClick={() => setIsOpenModal(true)}>
          <img
            style={{ width: '16px', height: '16px' }}
            src={RevokeIcon}
            alt="Revoke Icon"
          />
          Revoke token
        </ButtonAsLink>
        <InfoPin>old tokens and links will stop working</InfoPin>
      </Stack>

      {isOpenModal && (
        <ModalDialog
          setIsOpen={setIsOpenModal}
          title={'Revoke token?'}
          text={
            "Are you sure you want to revoke the token? This will change the token to a new one, so the login links will change. Don't forget to save the new token."
          }
          onClick={handleRevokeToken}
        />
      )}
    </>
  )
}
