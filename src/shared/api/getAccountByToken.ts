import { API_URL } from '@/shared/config/constants'
import { AccountInfo, ErrorMessage } from '@/shared/model/types'

export const getAccountByToken = async (
  token: string
): Promise<AccountInfo | ErrorMessage> => {
  const response = await fetch(
    `${API_URL}/getAccountInfo?access_token=${token}&fields=["short_name","author_name","author_url","auth_url","page_count"]`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}
