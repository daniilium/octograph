import cookies, { CookieOptions } from 'browser-cookies'

export const cookie = {
  get(key: string) {
    return cookies.get(key)
  },
  set({
    key,
    value,
    options,
  }: {
    key: string
    value: string
    options?: CookieOptions
  }) {
    cookies.set(key, value, options)
  },
  remove(key: string) {
    cookies.erase(key)
  },
  exist(key: string) {
    return !!cookies.get(key)
  },
} as const

export const { get, set, remove, exist } = cookie

export default cookie
