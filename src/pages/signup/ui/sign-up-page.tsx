import { useEffect } from 'react'

import { useGlobalContext } from '@/shared/model/global-context'

import { SignUpForm } from './sign-up-form'

export function SignUpPage() {
  const { setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Sign up',
      subtitle: 'create new token',
    })
  }, [])

  return <SignUpForm />
}
