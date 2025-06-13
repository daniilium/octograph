import { useCallback, useActionState, startTransition } from 'react'

import { CreateAccount } from '@/shared/model/types'

import { signUpAction, SignUpActionPayload } from './signUpAction'

export type SignUpState = {
  data: CreateAccount | null
  error: string | null
}

export function useSignUp() {
  const [{ data, error }, action, isPending] = useActionState<
    SignUpState,
    SignUpActionPayload
  >(signUpAction, {
    data: null,
    error: null,
  })

  const isSuccess = data !== null && error === null
  const isError = error !== null

  const signUp = useCallback(
    async ({ shortName }: SignUpActionPayload) => {
      startTransition(() => {
        action({ shortName })
      })
    },
    [action]
  )

  return { data, error, signUp, isPending, isSuccess, isError }
}
