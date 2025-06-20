import { useEffect, useState } from 'react'

import { useGetAccountByToken } from '@/shared/model/use-get-account-by-token'

type Props = {
  token: string
}

export function useAutoRefreshCreatePageLink({ token }: Props) {
  const [link, setLink] = useState<string>()

  const { data: account, actionCallback } = useGetAccountByToken()
  const getAccount = () => actionCallback({ token })

  useEffect(() => {
    if (account) setLink(account.result.auth_url)
  }, [account])

  useEffect(() => {
    getAccount()

    const interval = setInterval(() => {
      getAccount()
    }, 60000 * 4) // 4 minutes

    return () => clearInterval(interval)
  }, [])

  return { link }
}
