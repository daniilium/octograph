import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { existToken } from '../../services/token';

import { Nav } from '../Nav/Nav';

const Main = styled.div`
  min-height: 85vh;
  width: 100%;
  max-width: 730px;

  margin-left: auto;
  margin-right: auto;
  padding: 21px 21px;
  display: flex;
  flex-direction: column;
`;

type GlobalStore = {
  isAuth: boolean;
};

type GlobalContext = {
  GlobalStore: GlobalStore;
  setGlobalStore: (store: GlobalStore) => void;
};

export function Layout() {
  const [GlobalStore, setGlobalStore] = useState<GlobalStore>({
    isAuth: existToken(),
  });

  return (
    <>
      <Main>
        <Outlet context={{ GlobalStore, setGlobalStore }} />
      </Main>

      <Nav isAuth={GlobalStore.isAuth} />
    </>
  );
}

export const useGlobalContext = () => useOutletContext<GlobalContext>();
