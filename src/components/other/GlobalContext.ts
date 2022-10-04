import { useOutletContext } from 'react-router-dom';

export type GlobalStore = {
  isAuth: boolean;
};

type GlobalContext = {
  GlobalStore: GlobalStore;
  setGlobalStore: (store: GlobalStore) => void;
};

export const useGlobalContext = () => useOutletContext<GlobalContext>();
