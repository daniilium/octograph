import { useEffect } from 'react'

import { useGlobalContext } from '@/shared/model/global-context'

import { LoginForm } from './login-form'

export function LoginPage() {
  const { setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Login',
      subtitle: 'management telegra.ph',
    })
  }, [])

  return <LoginForm />
}
