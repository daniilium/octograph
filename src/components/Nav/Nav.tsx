import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { grayColor } from '../../css-in-js/global';

const NavStyled = styled.nav`
  width: 100%;
  max-width: 730px;

  margin-bottom: 21px;
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

type NavProps = {
  isAuth: boolean;
};

export const Nav = (props: NavProps) => {
  const { isAuth } = props;

  return (
    <NavStyled className="safari_only">
      <NavLink to="/">Главная</NavLink>

      {isAuth ? (
        <>
          <NavLink to="/pages">Страницы</NavLink>
          <NavLink to="/profile">Аккаунт</NavLink>
          <NavLink to="/logout">Выйти</NavLink>
        </>
      ) : (
        <NavLink to="/start">Старт</NavLink>
      )}
    </NavStyled>
  );
};
