import { createAccount } from '../-api/createAccount'
import { SignUpState } from './useSignUp'

export type SignUpActionPayload = {
  shortName: string
}

export async function signUpAction(
  _prevState: SignUpState,
  payload: SignUpActionPayload
) {
  try {
    const account = await createAccount(payload.shortName)

    if (!account.ok) return { data: null, error: account.error }

    return { data: account, error: null }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e)

    return { data: null, error: errorMessage }
  }
}
