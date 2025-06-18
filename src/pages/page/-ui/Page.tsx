import { useEffect, useState } from 'react'

import { Button, Link, MainText } from '@/shared/ui/atoms'
import { Stack } from '@/shared/ui/templates'

import { useParams } from '@tanstack/react-router'

import { useGetPage } from '../-model/useGetPage'
import { useCleanupPage } from '../-model/useCleanupPage'
import { Page as PageType } from '@/shared/model/types'
import { getToken } from '@/features/auth-token'
import { Modal } from '@/shared/ui/organisms/Modal'
import { useGlobalContext } from '@/shared/model/global-context'

const initialState: PageType = {
  title: 'Page',
  views: 0,
  author_name: '',
  author_url: '',
  description: '',
  url: '',
  path: '',
}

export function Page() {
  const { setHeader } = useGlobalContext()
  const { pageId } = useParams({
    from: '/page/$pageId',
  })

  const [page, setPage] = useState(initialState)

  const { data, actionCallback } = useGetPage()

  useEffect(() => {
    if (!data) {
      actionCallback({ path: pageId })
    }

    if (data) {
      setPage(data.result)
      setHeader({
        title: data.result.title,
        subtitle: `Views: ${data.result.views}`,
      })
    }
  }, [pageId, data])

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
    <Stack gap="8px">
      <MainText>
        <b>Author name:</b> {page.author_name}
      </MainText>

      <MainText>
        <b>Author url:</b> {page.author_url}
      </MainText>

      <MainText>
        <b>Description:</b> {page.description}
      </MainText>

      <Link to={page.url} target="_blank">
        Open this page in a new window
      </Link>

      <Stack align="left">
        <Button onClick={() => setIsOpenConfirmation(true)}>
          Clear this page
        </Button>
      </Stack>

      {isOpenConfirmation && (
        <Modal
          setIsOpen={setIsOpenConfirmation}
          title={'Clear page?'}
          text={
            'Clearing the page will result in the loss of data on the page. It will not be possible to undo the action.'
          }
          onClick={handleClearPage}
        />
      )}
    </Stack>
  )
}
