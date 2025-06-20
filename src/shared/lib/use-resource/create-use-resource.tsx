import { startTransition, useActionState, useCallback } from 'react'
import { createAction, ResourceState } from './create-action'
import { ErrorMessage, GoodAnswerWrapper } from '../../model/types'

type AsyncRequestFunction<TPayload, TResponse> = (
  payload: TPayload
) => Promise<GoodAnswerWrapper<TResponse> | ErrorMessage>

export function createUseResource<TResponse, TPayload>(
  apiRequest: AsyncRequestFunction<TPayload, TResponse>
) {
  return function useResource() {
    const action = createAction(apiRequest)

    const [state, dispatch, isPending] = useActionState(action, {
      data: null,
      error: null,
    } as ResourceState<TResponse>)

    const { data, error } = state
    const isSuccess = data !== null && error === null
    const isError = error !== null

    const actionCallback = useCallback(
      (payload: TPayload) => {
        startTransition(() => dispatch(payload))
      },
      [dispatch]
    )

    return { data, error, actionCallback, isPending, isSuccess, isError }
  }
}
