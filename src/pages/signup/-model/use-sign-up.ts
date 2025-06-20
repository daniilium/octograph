import { createUseResource } from '@/shared/lib/use-resource'
import { createAccount } from '../-api/create-account'

export const useSignUp = createUseResource(createAccount)
