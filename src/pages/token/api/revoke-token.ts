import { API_URL } from '@/shared/config/constants'
import { ErrorMessage, RevokeToken } from '@/shared/model/types'

type RevokeTokenPayload = {
  token: string
}

export async function revokeToken({
  token,
}: RevokeTokenPayload): Promise<RevokeToken | ErrorMessage> {
  const response = await fetch(
    `${API_URL}/revokeAccessToken?access_token=${token}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
