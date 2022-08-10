import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../Layout/Layout';

export const ProtectedRoute = ({ children }: any) => {
  const { GlobalStore } = useGlobalContext();

  if (!GlobalStore.isAuth) return <Navigate to="/" />;

  return children;
};
