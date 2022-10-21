import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'services/customHooks';
import { removeToken } from 'services/token';

import { useGlobalContext } from 'stores/GlobalContext';

export function Logout() {
  const navigate = useNavigate();
  const { GlobalStore, setGlobalStore } = useGlobalContext();

  // not use localPageNumber
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localPageNumber, setLocalPageNumber] = useLocalStorage('pageNumber', 1);

  useEffect(() => {
    removeToken();
    setGlobalStore({ ...GlobalStore, isAuth: false });
    setLocalPageNumber(1);
    navigate('/');
  });

  return <></>;
}
