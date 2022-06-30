import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Nav } from '../Nav/Nav';

const Main = styled.main`
  min-height: 85vh;
  width: 100%;
  max-width: 730px;

  margin-left: auto;
  margin-right: auto;
  padding: 21px 21px;
  display: flex;
  flex-direction: column;
`;

export function Layout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>

      <Nav />
    </>
  );
}
