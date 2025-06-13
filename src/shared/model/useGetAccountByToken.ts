import { useCallback, useActionState, startTransition } from 'react'

import { AccountInfo } from '@/shared/model/types'
import {
  getAccountByTokenAction,
  GetAccountByTokenActionPayload,
} from '@/shared/model/getAccountByTokenAction'

export type GetAccountByTokenState = {
  data: AccountInfo | null
  error: string | null
}

export function useGetAccountByToken() {
  const [{ data, error }, action, isPending] = useActionState<
    GetAccountByTokenState,
    GetAccountByTokenActionPayload
  >(getAccountByTokenAction<GetAccountByTokenState>, {
    data: null,
    error: null,
  })

  const isSuccess = data !== null && error === null
  const isError = error !== null

  const actionCallback = useCallback(
    async ({ token }: GetAccountByTokenActionPayload) => {
      startTransition(() => {
        action({ token })
      })
    },
    [action]
  )

  return { data, error, actionCallback, isPending, isSuccess, isError }
}
