import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { existToken } from 'services/token';

import { GlobalStore } from 'stores/GlobalContext';
import { Nav } from 'components/organisms/Nav';

const ContentContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;

  padding: 21px;
  width: 100%;
  min-height: 100%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export function Layout() {
  const [GlobalStore, setGlobalStore] = useState<GlobalStore>({
    isAuth: existToken(),
  });

  return (
    <LayoutContainer>
      <ContentContainer>
        <Outlet context={{ GlobalStore, setGlobalStore }} />
      </ContentContainer>

      <Nav isAuth={GlobalStore.isAuth} />
    </LayoutContainer>
  );
}
