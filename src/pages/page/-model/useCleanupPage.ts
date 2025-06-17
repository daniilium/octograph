import { handleAction } from '@/shared/lib/handleAction'
import { cleanupPage, CleanupPagePayload } from '../-api/cleanupPage'
import { PageAnswer } from '@/shared/model/types'
import { startTransition, useActionState, useCallback } from 'react'

export type CleanupPageState = {
  data: PageAnswer | null
  error: string | null
}

export function useCleanupPage() {
  const myAction = handleAction<CleanupPageState, CleanupPagePayload>(
    cleanupPage
  )

  const initialState = { data: null, error: null }

  const [{ data, error }, action, isPending] = useActionState<
    CleanupPageState,
    CleanupPagePayload
  >(myAction, initialState)

  const isSuccess = data !== null && error === null
  const isError = error !== null

  const actionCallback = useCallback(
    async (payload: CleanupPagePayload) => {
      startTransition(() => {
        action(payload)
      })
    },
    [action]
  )

  return { data, error, actionCallback, isPending, isSuccess, isError }
}
