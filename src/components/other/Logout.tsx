import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/services/customHooks';
import { removeToken } from '@/services/token';

import { useGlobalContext } from '@/stores/GlobalContext';

export function Logout() {
  const navigate = useNavigate();
  const { GlobalStore, setGlobalStore } = useGlobalContext();

  const [, setLocalPageNumber] = useLocalStorage('pageNumber', 1);

  useEffect(() => {
    removeToken();
    setGlobalStore({ ...GlobalStore, isAuth: false });
    setLocalPageNumber(1);
    navigate('/');
  });

  return <></>;
}
