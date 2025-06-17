import { editAccountInfo, ProfileForm } from '../-api/editAccountInfo'

export type EditAccountInfoActionPayload = {
  token: string
  userForm: ProfileForm
}

export async function editAccountInfoAction<T>(
  _prevState: T,
  payload: EditAccountInfoActionPayload
) {
  try {
    const account = await editAccountInfo(payload.token, payload.userForm)

    if (!account.ok) return { data: null, error: account.error }

    return { data: account, error: null }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e)

    return { data: null, error: errorMessage }
  }
}
