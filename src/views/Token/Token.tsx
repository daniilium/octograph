import styled from 'styled-components';
import copy from 'copy-to-clipboard';

import { Header, redColor, Subtitle, Title } from '../../css-in-js/global';
import {  getToken, revokeAccessToken } from '../../services/token';
import { Button, Content, UserData, UserDataItem } from '../Profile/Profile.style';
import { ErrorPin, InformationPin, PinContainer } from '../Start/start.style';
import { IconCopy } from './components/IconCopy';
import { IconWarning } from './components/IconWarning';

const RedTitle = styled(Title)`
  color: ${redColor};
`;

export function Token() {
  const copyToken = () => {
    const token = getToken();
    if (token) copy(token);
    return;
  };

  const copyLink = () => {
    const token = getToken();
    const link = `${window.location.origin}/start/${token}`;
    if (token) copy(link);
    return;
  };

  return (
    <>
      <Header>
        <RedTitle>Внимание</RedTitle>
        <Subtitle>Управление токеном</Subtitle>
      </Header>

      <UserData>
        <UserDataItem>
          <Content>
            <Button onClick={copyToken}>
              <IconCopy />
            </Button>
            <p>Скопировать токен</p>
          </Content>

          <PinContainer>
            <InformationPin>
              передача токена третьим лицам, может повлечь утрату управлением аккаунта
            </InformationPin>
          </PinContainer>
        </UserDataItem>

        <UserDataItem>
          <Content>
            <Button onClick={copyLink}>
              <IconCopy />
            </Button>
            <p>Скопировать ссылку для входа</p>
          </Content>

          <PinContainer>
            <InformationPin>содержит токен в ссылке</InformationPin>
          </PinContainer>
        </UserDataItem>

        <UserDataItem>
          <Content>
            <Button onClick={revokeAccessToken}>
              <IconWarning />
            </Button>
            <p>Перевыпустить токен</p>
          </Content>

          <PinContainer>
            <ErrorPin>перестанут работать старые токены и ссылки</ErrorPin>
          </PinContainer>
        </UserDataItem>
      </UserData>
    </>
  );
}
