import cookies from 'browser-cookies'
import { crypto } from './crypto'

export const setToken = (token: string) => {
  cookies.set('token', crypto(token), { expires: 1 })
}
