import { useEffect } from 'react'

import { useGlobalContext } from '@/shared/model/GlobalContext'
import { redirect } from '@tanstack/react-router'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import { removeToken } from '@/shared/api/token'

export function Logout() {
  const { changeIsAuth } = useGlobalContext()

  const [, setLocalPageNumber] = useLocalStorage('pageNumber', 1)

  useEffect(() => {
    removeToken()
    changeIsAuth(false)
    setLocalPageNumber(1)
    throw redirect({ to: '/' })
  })

  return <></>
}
