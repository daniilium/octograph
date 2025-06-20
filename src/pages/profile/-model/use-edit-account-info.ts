import { createUseResource } from '@/shared/lib/use-resource'
import { editAccountInfo } from '../-api/edit-account-info'

export const useEditAccountInfo = createUseResource(editAccountInfo)
