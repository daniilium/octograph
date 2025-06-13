import cookies from 'browser-cookies'
import { decrypt } from '.'

export const getToken = () => {
  const token = cookies.get('token')
  if (token) return decrypt(token)
  else return null
}
