import { useEffect, useState } from 'react'

import { useParams } from '@tanstack/react-router'

import { useGetPage } from '../model/use-get-page'

import { Page as PageType } from '@/shared/model/types'

import { useGlobalContext } from '@/shared/model/global-context'
import { MainText } from '@/shared/ui/atoms/MainText'
import { Stack } from '@/shared/ui/templates/stack'
import { Link } from '@/shared/ui/atoms/Link'
import { ClearPage } from './clear-page'

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

      <ClearPage pageId={pageId} setPage={setPage} />
    </Stack>
  )
}
