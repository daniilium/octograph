import { API_URL } from '@/shared/config/constants'
import { ErrorMessage, PageAnswer } from '@/shared/model/types'

export type GetPagePayload = {
  path: string
}

export const getPage = async ({
  path,
}: GetPagePayload): Promise<PageAnswer | ErrorMessage> => {
  const response = await fetch(
    `${API_URL}/getPage/${path}?return_content=true`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
