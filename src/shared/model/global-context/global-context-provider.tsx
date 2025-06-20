import { useCallback, useState } from 'react'

import { GlobalContext } from './global-context'

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [{ title, subtitle }, setHeader] = useState({ title: '', subtitle: '' })

  const value = {
    isAuthenticated,
    setAuthenticated,
    title,
    subtitle,
    setHeader,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
