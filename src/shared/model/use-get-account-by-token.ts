import { getAccountByToken } from '../api/getAccountByToken'
import { createUseResource } from '../lib/use-resource'

export const useGetAccountByToken = createUseResource(getAccountByToken)
