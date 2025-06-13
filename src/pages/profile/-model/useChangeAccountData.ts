import { useCallback, useActionState, startTransition } from 'react'

import { CreateAccount } from '@/shared/model/types'
import {
  editAccountInfoAction,
  EditAccountInfoActionPayload,
} from './editAccountInfoAction'

export type EditAccountInfoState = {
  data: CreateAccount | null
  error: string | null
}

export function useEditAccountInfo() {
  const [{ data, error }, action, isPending] = useActionState<
    EditAccountInfoState,
    EditAccountInfoActionPayload
  >(editAccountInfoAction<EditAccountInfoState>, {
    data: null,
    error: null,
  })

  const isSuccess = data !== null && error === null
  const isError = error !== null

  const actionCallback = useCallback(
    async (payload: EditAccountInfoActionPayload) => {
      startTransition(() => {
        action(payload)
      })
    },
    [action]
  )

  return { data, error, actionCallback, isPending, isSuccess, isError }
}
