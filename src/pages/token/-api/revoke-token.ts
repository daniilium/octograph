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

  // if (json.ok) {
  //   const result = json.result
  //   const newToken = result.access_token
  //   removeToken()
  //   setToken(newToken)
  // }

  // if (!json.ok) {
  //   alert('Error revoke token')
  //   console.log('Error revokeAccessToken', json)
  // }
}
