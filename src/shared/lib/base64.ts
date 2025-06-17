export const base64 = {
  encode(str: string) {
    return btoa(str)
  },
  decode(str: string) {
    return atob(str)
  },
} as const

export const { encode, decode } = base64

export default base64
