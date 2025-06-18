import { GlobalContextProvider } from '@/shared/model/global-context'

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>
}
