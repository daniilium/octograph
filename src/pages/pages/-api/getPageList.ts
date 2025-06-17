import { API_URL } from '@/shared/config/constants'
import { GetPageList } from '@/shared/model/types'

export type GetPageListPayload = {
  offset: number
  limit: number
  token: string
}

export const getPageList = async ({
  offset,
  limit,
  token,
}: GetPageListPayload): Promise<GetPageList> => {
  const response = await fetch(
    `${API_URL}/getPageList?access_token=${token}&offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
