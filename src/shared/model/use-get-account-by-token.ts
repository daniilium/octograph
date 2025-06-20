import { getAccountByToken } from '../api/get-account-by-token'
import { createUseResource } from '../lib/use-resource'

export const useGetAccountByToken = createUseResource(getAccountByToken)
