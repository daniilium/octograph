import styled from 'styled-components';

import { Link } from 'components/atoms';

const NavContainer = styled.nav`
  display: flex;
  gap: 16px;

  padding: 21px;
  width: 100%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
`;

type NavProps = {
  isAuth: boolean;
};

export const Nav = (props: NavProps) => {
  const { isAuth } = props;

  return (
    <NavContainer className="safari_only">
      <Link href="/">Home</Link>

      {isAuth ? (
        <>
          <Link href="/profile">Profile</Link>
          <Link href="/pages">Pages</Link>
        </>
      ) : (
        <Link href="/login">Sign in</Link>
      )}
    </NavContainer>
  );
};
