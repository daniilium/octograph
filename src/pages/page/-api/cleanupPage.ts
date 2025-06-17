import { API_URL } from '@/shared/config/constants'
import { PageAnswer, ErrorMessage } from '@/shared/model/types'

export type CleanupPagePayload = {
  path: string
  token: string
}

export async function cleanupPage({
  path,
  token,
}: CleanupPagePayload): Promise<PageAnswer | ErrorMessage> {
  const response = await fetch(
    `${API_URL}/editPage/${path}?access_token=${token}&title=Empty+Page&author_name=Anonymous&content=[%7B%22tag%22:%22p%22,%22children%22:[%22%20%22]%7D]&return_content=true`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
