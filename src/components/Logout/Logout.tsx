import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { removeToken } from '../../services/cookies';
import { useGlobalContext } from '../Layout/Layout';

export function Logout() {
  const navigate = useNavigate();
  const { setGlobalStore } = useGlobalContext();

  useEffect(() => {
    removeToken();
    setGlobalStore({ isAuth: false });
    navigate('/');
  });
  return <></>;
}
