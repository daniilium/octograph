import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { removeToken } from '@/features/auth-token'

import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import { useGlobalContext } from '@/shared/model/global-context'

export function LogoutPage() {
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
