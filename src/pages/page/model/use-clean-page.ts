import { createUseResource } from '@/shared/lib/use-resource'

import { cleanPage } from '../api/clean-page'

export const useCleanupPage = createUseResource(cleanPage)
