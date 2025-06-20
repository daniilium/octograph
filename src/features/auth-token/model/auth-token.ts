import base64 from '@/shared/lib/base64'
import cookie from '@/shared/lib/cookie'

const KEY = 'token'

export const authToken = {
  getToken(): string | null {
    const token = cookie.get(KEY)

    return token ? base64.decode(token) : null
  },
  setToken(token: string) {
    cookie.set({
      key: KEY,
      value: base64.encode(token),
      options: {
        expires: 86400, // one day
        path: '/',
        domain: window.location.hostname,
        secure: window.location.protocol === 'https:',
      },
    })
  },
  removeToken() {
    cookie.remove(KEY)
  },
  existToken() {
    return cookie.exist(KEY)
  },
} as const

export const { getToken, setToken, removeToken, existToken } = authToken

export default authToken
