import { useEffect, useState } from 'react'

import { getToken } from '@/features/auth-token'

import { Page } from '@/shared/model/types'
import { Button } from '@/shared/ui/atoms/button'
import { ModalDialog } from '@/shared/ui/organisms/modal-dialog'
import { Stack } from '@/shared/ui/templates/stack'

import { useCleanupPage } from '../model/use-clean-page'

type Props = {
  pageId: string
  setPage: (page: Page) => void
}

export function ClearPage({ pageId, setPage }: Props) {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const { data: emptyPage, actionCallback: setClearPage } = useCleanupPage()

  const handleClearPage = () => {
    const token = getToken()
    if (!token) {
      console.error('no token')
      return
    }

    setClearPage({ path: pageId, token })
    setIsOpenConfirmation(false)
  }

  useEffect(() => {
    if (emptyPage) {
      setPage(emptyPage.result)
      setIsOpenConfirmation(false)
    }
  }, [emptyPage])

  return (
    <>
      <Stack align="left">
        <Button onClick={() => setIsOpenConfirmation(true)}>
          Clear this page
        </Button>
      </Stack>

      {isOpenConfirmation && (
        <ModalDialog
          setIsOpen={setIsOpenConfirmation}
          title={'Clear page?'}
          text={
            'Clearing the page will result in the loss of data on the page. It will not be possible to undo the action.'
          }
          onClick={handleClearPage}
        />
      )}
    </>
  )
}
