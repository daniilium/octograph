import { useCallback, useState } from 'react'

import { GlobalContext } from './global-context'

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuth, setIsAuth] = useState(false)
  const [{ title, subtitle }, setHeader] = useState({ title: '', subtitle: '' })

  const changeIsAuth = useCallback((isAuth: boolean) => setIsAuth(isAuth), [])

  const value = { isAuth, changeIsAuth, title, subtitle, setHeader }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
