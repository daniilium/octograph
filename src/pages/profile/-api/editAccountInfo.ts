import { API_URL } from '@/shared/config/constants'
import { CreateAccount, ErrorMessage, ProfileForm } from '@/shared/model/types'

export const editAccountInfo = async (
  token: string,
  userForm: ProfileForm
): Promise<CreateAccount | ErrorMessage> => {
  const { shortName, authorName, authorUrl } = userForm

  if (!token) return { ok: false, error: 'No token' }
  const response = await fetch(
    `${API_URL}/editAccountInfo?access_token=${token}&short_name=${shortName}&author_name=${authorName}&author_url=${authorUrl}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
