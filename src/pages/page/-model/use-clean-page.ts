import { cleanPage } from '../-api/clean-page'
import { createUseResource } from '@/shared/lib/use-resource'

export const useCleanupPage = createUseResource(cleanPage)
