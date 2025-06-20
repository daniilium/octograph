import { API_URL } from '@/shared/config/constants'
import { CreateAccount, ErrorMessage } from '@/shared/model/types'

export type CreateAccountPayload = {
  shortName: string
}

export const createAccount = async ({
  shortName,
}: CreateAccountPayload): Promise<CreateAccount | ErrorMessage> => {
  const response = await fetch(
    `${API_URL}/createAccount?short_name=${shortName}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )
  return await response.json()
}
