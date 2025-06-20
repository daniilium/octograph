import { createUseResource } from '@/shared/lib/use-resource'

import { revokeToken } from '../api/revoke-token'

export const useRevokeToken = createUseResource(revokeToken)
