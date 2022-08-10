import { useEffect, useState } from 'react';

import { Header, Title, Subtitle } from '../../css-in-js/global';
import { getAccount } from '../../services/account';
import { getToken } from '../../services/cookies';
import { ErrorMessage } from '../../helpers/interfaces';

export const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    short_name: '',
    author_name: '',
    author_url: '',
    auth_url: '',
    page_count: 0,
  });
  const token = getToken();

  useEffect(() => {
    const get = async () => {
      const accountInfo = await getAccount();

      if (accountInfo.ok) setUserInfo(accountInfo.result);
      else alert((accountInfo as ErrorMessage).error);
    };

    get();
  }, []);

  return (
    <>
      <Header>
        <Title>Профиль</Title>
        <Subtitle>изменить данные</Subtitle>
      </Header>

      <main>
        <label>
          <p>short_name</p>
          <input value={userInfo['short_name']} type="text" name="" id="" />
        </label>
        <label>
          <p>author_name</p>
          <input value={userInfo['author_name']} type="text" name="" id="" />
        </label>
        <label>
          <p>author_url</p>
          <a href={userInfo['author_url']}>author_url</a>
        </label>
        <label>
          <p>auth_url</p>
          <a href={userInfo.auth_url}>auth_url</a>
        </label>
        <label>
          <p>page_count {userInfo.page_count}</p>
        </label>
        <label>
          <p>token {token}</p>
        </label>
      </main>
    </>
  );
};
