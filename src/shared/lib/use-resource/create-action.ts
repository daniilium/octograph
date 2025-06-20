/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, GoodAnswerWrapper } from '../../model/types'

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never

type UnwrapGoodAnswer<T> = T extends GoodAnswerWrapper<infer R> ? R : never

export interface ResourceState<R> {
  data: GoodAnswerWrapper<R> | null
  error: string | null
}

export function createAction<
  F extends (payload: any) => Promise<GoodAnswerWrapper<any> | ErrorMessage>,
>(request: F) {
  type Payload = Parameters<F>[0]
  type Response = AsyncReturnType<F>
  type UnwrappedResponse = Response extends ErrorMessage
    ? never
    : UnwrapGoodAnswer<Response>

  return async function (
    _prevState: ResourceState<UnwrappedResponse>,
    payload: Payload
  ): Promise<ResourceState<UnwrappedResponse>> {
    try {
      const response = await request(payload)

      if (!response.ok) return { data: null, error: response.error }

      return { data: response, error: null }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e)

      return { data: null, error: errorMessage }
    }
  }
}
