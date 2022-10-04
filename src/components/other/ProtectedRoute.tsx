import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';

type Props = {
  component: JSX.Element;
};

export const ProtectedRoute = (props: Props) => {
  const { GlobalStore } = useGlobalContext();

  if (!GlobalStore.isAuth) return <Navigate to="/" />;

  return props.component;
};
