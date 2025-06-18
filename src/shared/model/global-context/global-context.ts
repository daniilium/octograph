import { createContext } from 'react'

export interface GlobalContextState {
  isAuth: boolean
  changeIsAuth: (isAuth: boolean) => void

  title: string
  subtitle: string
  setHeader: (header: { title: string; subtitle: string }) => void
}

export const GlobalContext = createContext<GlobalContextState | null>(null)
