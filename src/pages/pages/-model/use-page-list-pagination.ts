import {
  useEffect,
  useActionState,
  useCallback,
  startTransition,
  useMemo,
} from 'react'

import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import { GetPageList } from '@/shared/model/types'
import { handleAction } from '@/shared/lib/handleAction'

import { getPageList, GetPageListPayload } from '../-api/getPageList'
import { getToken } from '@/features/auth-token'

export type PageListState = {
  data: GetPageList | null
  error: string | null
}

export function usePageListPagination(limit = 20) {
  const action = useMemo(
    () => handleAction<PageListState, GetPageListPayload>(getPageList),
    []
  )
  const [currentPage, setCurrentPage] = useLocalStorage('pageNumber', 1)

  const [{ data, error }, runAction] = useActionState<
    PageListState,
    GetPageListPayload
  >(action, { data: null, error: null })

  const { pages, total_count: totalCount } = data?.result || {
    total_count: 0,
    pages: [],
  }

  const nextPage = useCallback(() => {
    setCurrentPage(currentPage + 1)
  }, [currentPage])

  const previousPage = useCallback(() => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
  }, [currentPage])

  const fetchPage = useCallback(
    ({ page }: { page: number }) => {
      const token = getToken()
      if (!token) return

      // Sequential number of the first page to be returned.
      const offset = (page - 1) * limit

      startTransition(() => runAction({ offset, limit, token }))
    },
    [limit, runAction]
  )

  useEffect(() => {
    fetchPage({ page: currentPage })
  }, [currentPage])

  return { pages, currentPage, totalCount, error, nextPage, previousPage }
}
