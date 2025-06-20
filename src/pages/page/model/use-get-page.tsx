import { startTransition, useActionState, useCallback } from 'react'

import { PageAnswer } from '@/shared/model/types'
import { createAction } from '@/shared/lib/use-resource'

import { getPage, GetPagePayload } from '../api/get-page'

export type GetPageState = {
  data: PageAnswer | null
  error: string | null
}

export function useGetPage() {
  const myAction = createAction(getPage)

  const [{ data, error }, action, isPending] = useActionState<
    GetPageState,
    GetPagePayload
  >(myAction, {
    data: null,
    error: null,
  })

  const isSuccess = data !== null && error === null
  const isError = error !== null

  const actionCallback = useCallback(
    async ({ path }: GetPagePayload) => {
      startTransition(() => {
        action({ path })
      })
    },
    [action]
  )

  return { data, error, actionCallback, isPending, isSuccess, isError }
}
