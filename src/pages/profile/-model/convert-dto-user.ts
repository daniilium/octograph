import { CreateAccount } from '@/shared/model/types'

export const convertDtoUser = (raw: CreateAccount) => {
  const { short_name, author_name, author_url } = raw.result
  return {
    shortName: short_name,
    authorName: author_name,
    authorUrl: author_url,
  }
}
