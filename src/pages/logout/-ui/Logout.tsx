import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { removeToken } from '@/entities/auth-token'

import { useGlobalContext } from '@/shared/model/GlobalContext'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'

export function Logout() {
  const navigate = useNavigate()
  const { changeIsAuth } = useGlobalContext()

  const [, setLocalPageNumber] = useLocalStorage('pageNumber', 1)

  useEffect(() => {
    removeToken()
    changeIsAuth(false)
    setLocalPageNumber(1)
    navigate({ to: '/' })
  })

  return <></>
}
