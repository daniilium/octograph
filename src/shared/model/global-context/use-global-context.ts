import { useContext } from 'react'

import { GlobalContext } from './global-context'

export function useGlobalContext() {
  const ctx = useContext(GlobalContext)
  if (!ctx) throw new Error('useGlobalContext must be used within a provider')
  return ctx
}
