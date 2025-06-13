import { getAccountByToken } from '@/shared/api/getAccountByToken'

export type GetAccountByTokenActionPayload = {
  token: string
}

export async function getAccountByTokenAction<T>(
  _prevState: T,
  payload: GetAccountByTokenActionPayload
) {
  try {
    const account = await getAccountByToken(payload.token)

    if (!account.ok) return { data: null, error: account.error }

    return { data: account, error: null }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e)

    return { data: null, error: errorMessage }
  }
}
