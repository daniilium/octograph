import { GlobalContextProvider } from '@/shared/model/GlobalContext'

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>
}
