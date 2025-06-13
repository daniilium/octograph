import cookies from 'browser-cookies'
import { decrypt, encrypt } from './crypto'

const KEY = 'token'

export const cookieStorage = {
  get(): string | null {
    const token = cookies.get(KEY)

    return token ? decrypt(token) : null
  },
  set(token: string) {
    cookies.set(KEY, encrypt(token), { expires: 1 })
  },
  remove() {
    cookies.erase(KEY)
  },
  exist() {
    return !!cookies.get(KEY)
  },
} as const

export const { get, set, remove, exist } = cookieStorage

export default cookieStorage
