import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Header, Title, Subtitle, InputStyle, Link } from '../../css-in-js/global';
import {
  changeAuthorNameAccount,
  changeAuthorUrlAccount,
  changeShortNameAccount,
  getAccount,
} from '../../services/account';
import { ErrorMessage } from '../../helpers/interfaces';
import { ErrorPin, InformationPin, PinContainer } from '../Start/start.style';
import { IconPencil } from './components/IconPencil';
import { IconApprove } from './components/IconApprove';
import { Button, Content, EditForm, EmptyMessage, UserData, UserDataItem } from './Profile.style';

type UserInfo = {
  short_name: string;
  author_name: string;
  author_url: string;
  auth_url: string;
  page_count: number;
};

export const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [shortNameEdit, setShortNameEdit] = useState(false);
  const [authorNameEdit, setAuthorNameEdit] = useState(false);
  const [authorUrlEdit, setAuthorUrlEdit] = useState(false);

  useEffect(() => {
    const get = async () => {
      const accountInfo = await getAccount();

      if (accountInfo.ok) setUserInfo(accountInfo.result);
      else alert((accountInfo as ErrorMessage).error);
    };

    get();
  }, []);

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ShortNameData>();

  type ShortNameData = {
    short_name: string;
    author_name: string;
    author_url: string;
  };

  const onSubmitShortName = async (data: ShortNameData) => {
    if (!userInfo) return;

    if ('short_name' in data) {
      const { short_name } = data;
      const response = await changeShortNameAccount(short_name);
      if (response.ok) setUserInfo({ ...userInfo, short_name });
      if (!response.ok) setError('short_name', { type: 'server_error', message: 'server error' });

      setShortNameEdit(false);
    }

    if ('author_name' in data) {
      const { author_name } = data;
      const response = await changeAuthorNameAccount(author_name);
      if (response.ok) setUserInfo({ ...userInfo, author_name });
      if (!response.ok) setError('author_name', { type: 'server_error', message: 'server error' });

      setAuthorNameEdit(false);
    }

    if ('author_url' in data) {
      const { author_url } = data;
      const response = await changeAuthorUrlAccount(author_url);
      if (response.ok) {
        setUserInfo({ ...userInfo, author_url });
        setAuthorUrlEdit(false);
        unregister('author_url');
      }
      if (!response.ok) {
        if (response.error === 'AUTHOR_URL_INVALID') {
          setError('author_url', {
            type: 'invalid_url',
            message: 'Invalid url',
          });
        } else {
          setError('author_url', { type: 'server_error', message: 'server error' });
        }
      }
    }
  };

  return (
    <>
      <Header>
        <Title>Профиль</Title>
        <Subtitle>профиль</Subtitle>
      </Header>

      <UserData>
        <UserDataItem>
          {shortNameEdit ? (
            <EditForm onSubmit={handleSubmit(onSubmitShortName)}>
              <InputStyle
                type="text"
                defaultValue={userInfo?.short_name}
                {...register('short_name', { required: true, minLength: 1, maxLength: 32 })}
              />
              <Button>
                <IconApprove />
              </Button>
            </EditForm>
          ) : (
            <Content>
              <Button onClick={() => setShortNameEdit(true)}>
                <IconPencil />
              </Button>
              <p>short_name: </p>
              <p>{userInfo?.short_name}</p>
            </Content>
          )}

          <PinContainer>
            {errors.short_name?.type === 'server_error' && <ErrorPin>ошибка сервера</ErrorPin>}
            {errors.short_name?.type === 'required' && (
              <ErrorPin>поле должно быть заполнено</ErrorPin>
            )}
            {errors.short_name?.type === 'minLength' && (
              <ErrorPin>минимальная длина 1 символ</ErrorPin>
            )}
            {errors.short_name?.type === 'maxLength' && (
              <ErrorPin>максимальная длина 32 символа</ErrorPin>
            )}
            <InformationPin>видно только тебе</InformationPin>
          </PinContainer>
        </UserDataItem>

        <UserDataItem>
          {authorNameEdit ? (
            <EditForm onSubmit={handleSubmit(onSubmitShortName)}>
              <InputStyle
                type="text"
                defaultValue={userInfo?.author_name}
                {...register('author_name', { maxLength: 128 })}
              />
              <Button>
                <IconApprove />
              </Button>
            </EditForm>
          ) : (
            <Content>
              <Button onClick={() => setAuthorNameEdit(true)}>
                <IconPencil />
              </Button>
              <p>author_name: </p>
              <p>{userInfo?.author_name}</p>
              <EmptyMessage>{userInfo?.author_name === '' ? 'пусто' : ''}</EmptyMessage>
            </Content>
          )}

          <PinContainer>
            {errors.author_name?.type === 'server_error' && <ErrorPin>ошибка сервера</ErrorPin>}
            {errors.author_name?.type === 'maxLength' && (
              <ErrorPin>максимальная длина 128 символов</ErrorPin>
            )}
            <InformationPin>может быть пустым</InformationPin>
            <InformationPin>видно под заголовком статьи</InformationPin>
            <InformationPin>изменится только в новых статьях</InformationPin>
          </PinContainer>
        </UserDataItem>

        <UserDataItem>
          {authorUrlEdit ? (
            <EditForm onSubmit={handleSubmit(onSubmitShortName)}>
              <InputStyle
                type="text"
                defaultValue={userInfo?.author_url}
                {...register('author_url', { maxLength: 512 })}
              />
              <Button>
                <IconApprove />
              </Button>
            </EditForm>
          ) : (
            <Content>
              <Button onClick={() => setAuthorUrlEdit(true)}>
                <IconPencil />
              </Button>
              <p>author_url: </p>
              <p>{userInfo?.author_url}</p>
              <EmptyMessage>{userInfo?.author_url === '' ? 'пусто' : ''}</EmptyMessage>
            </Content>
          )}

          <PinContainer>
            {errors.author_url?.type === 'server_error' && <ErrorPin>ошибка сервера</ErrorPin>}
            {errors.author_url?.type === 'invalid_url' && <ErrorPin>неверный формат url</ErrorPin>}
            {errors.author_url?.type === 'maxLength' && (
              <ErrorPin>максимальная длина 512 символов</ErrorPin>
            )}
            <InformationPin>может быть пустым</InformationPin>
            <InformationPin>author_name станет ссылкой</InformationPin>
            <InformationPin>изменится только в новых статьях</InformationPin>
            <InformationPin>должно начинаться с http:// или https:// или mailto:</InformationPin>
          </PinContainer>
        </UserDataItem>

        <Link href="/token">Управление токеном</Link>

        <UserDataItem>
          <Link href={userInfo?.auth_url} target="_blank">
            Авторизоваться в telegra.ph
          </Link>
          <PinContainer>
            <InformationPin>ссылка действительна только пять минут</InformationPin>
            <InformationPin>обновление страницы перевыпускает ссылку</InformationPin>
          </PinContainer>
        </UserDataItem>
      </UserData>
    </>
  );
};
