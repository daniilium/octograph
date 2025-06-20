import { createContext } from 'react'

export interface GlobalContextState {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void

  title: string
  subtitle: string
  setHeader: (header: { title: string; subtitle: string }) => void
}

export const GlobalContext = createContext<GlobalContextState | null>(null)
