import { getToken } from '@/entities/auth-token'
import { API_URL } from '@/shared/config/constants'
import { GetPageList } from '@/shared/model/types'

export const getPageList = async (
  offset = 0,
  limit = 20
): Promise<GetPageList> => {
  const token = getToken()

  const response = await fetch(
    `${API_URL}/getPageList?access_token=${token}&offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const json = await response.json()

  return json
}
