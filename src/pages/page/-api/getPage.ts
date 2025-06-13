import { API_URL } from '@/shared/config/constants'

export const getPage = async (path: string) => {
  const response = await fetch(
    `${API_URL}/getPage/${path}?return_content=true`,
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
