export const crypto = {
  encrypt(str: string) {
    return btoa(str)
  },
  decrypt(str: string) {
    return atob(str)
  },
} as const

export const { encrypt, decrypt } = crypto

export default crypto
