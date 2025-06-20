import {
  useEffect,
  useActionState,
  useCallback,
  startTransition,
  useMemo,
} from 'react'

import { getToken } from '@/features/auth-token'

import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import { GetPageList } from '@/shared/model/types'
import { createAction } from '@/shared/lib/use-resource'

import { getPageList, GetPageListPayload } from '../api/get-page-list'

export type PageListState = {
  data: GetPageList | null
  error: string | null
}

export function usePageListPagination(limit = 20) {
  const action = useMemo(() => createAction(getPageList), [])
  const [currentPage, setCurrentPage] = useLocalStorage('pageNumber', 1)

  const [{ data, error }, dispatch] = useActionState<
    PageListState,
    GetPageListPayload
  >(action, { data: null, error: null })

  const { pages, total_count: totalCount } = data?.result || {
    total_count: 0,
    pages: [],
  }

  const canGoNext = currentPage < Math.ceil(totalCount / limit)
  const canGoPrevious = currentPage > 1

  const nextPage = useCallback(() => {
    if (!canGoNext) return
    setCurrentPage(currentPage + 1)
  }, [currentPage])

  const previousPage = useCallback(() => {
    if (!canGoPrevious) return
    setCurrentPage(currentPage - 1)
  }, [currentPage])

  const fetchPage = useCallback(
    ({ page }: { page: number }) => {
      const token = getToken()
      if (!token) return

      // offset is sequential number of the first page to be returned.
      const offset = (page - 1) * limit

      startTransition(() => dispatch({ offset, limit, token }))
    },
    [limit, dispatch]
  )

  useEffect(() => {
    fetchPage({ page: currentPage })
  }, [currentPage])

  return { pages, currentPage, totalCount, error, nextPage, previousPage }
}
