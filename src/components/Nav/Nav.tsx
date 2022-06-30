import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { grayColor } from '../../css-in-js/global';
import { isAuthorized } from '../../services/cookies';

const NavStyled = styled.nav`
  width: 100%;
  max-width: 730px;

  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 21px;

  display: flex;
  gap: 16px;
`;

const NavLink = styled(Link)`
  color: ${grayColor};
  // text-decoration: none;
`;

export const Nav = () => {
  return (
    <NavStyled>
      <NavLink to="/">Home</NavLink>

      {isAuthorized() ? (
        <>
          <NavLink to="/pages">Pages</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
      ) : (
        <NavLink to="/authorization">Login / Signup</NavLink>
      )}
    </NavStyled>
  );
};
