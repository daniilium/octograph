import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { existToken } from '../../services/token';

import { Nav } from '../Nav/Nav';

const Main = styled.div`
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
  max-width: 730px;

  margin-left: auto;
  margin-right: auto;
  padding: 21px 21px;
  display: flex;
  flex-direction: column;
`;

const LayoutStyle = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    <LayoutStyle>
      <Main>
        <Outlet context={{ GlobalStore, setGlobalStore }} />
      </Main>

      <Nav isAuth={GlobalStore.isAuth} />
    </LayoutStyle>
  );
}

export const useGlobalContext = () => useOutletContext<GlobalContext>();
