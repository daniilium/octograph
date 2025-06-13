import { createContext, useCallback, useContext, useState } from "react";

export interface GlobalContextShape {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  changeIsAuth: (isAuth: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextShape | null>(null);

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);

  const login = useCallback(() => setIsAuth(true), []);

  const logout = useCallback(() => setIsAuth(false), []);

  const changeIsAuth = useCallback((isAuth: boolean) => setIsAuth(isAuth), []);

  const value = { isAuth, changeIsAuth, login, logout };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useAuth() must be used within <AuthProvider>");
  return ctx; 
}
