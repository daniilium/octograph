import { SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../components/Layout/Layout';

import { Header, Title, Subtitle, Link } from '../../css-in-js/global';
import { createAccount, getAccountByToken } from '../../services/account';
import { ErrorMessage } from '../../helpers/interfaces';
import {
  Button,
  EmptySpace,
  ErrorPin,
  FormStyle,
  InformationPin,
  InputContainer,
  InputStyle,
  PinContainer,
} from './start.style';

type FormData =
  | {
      token: string;
    }
  | {
      short_name: string;
    };

type Props = {
  status: 'login' | 'signup';
};

export const Start = (props: Props) => {
  const { setGlobalStore } = useGlobalContext();

  const [isStatus, setStatus] = useState(props.status);
  const navigate = useNavigate();
  const id = useParams().id;

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (id) onSubmit({ token: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (data: FormData) => {
    if ('token' in data) {
      const { token } = data;
      const account = await getAccountByToken(token);

      if (account.ok) {
        setGlobalStore({ isAuth: true });
        navigate('/profile');
      }

      if (!account.ok) {
        const error = (account as ErrorMessage).error;
        if (error === 'ACCESS_TOKEN_INVALID')
          setError('token', { type: 'invalid_token', message: 'Invalid token' });
        else setError('token', { type: 'async', message: 'async error' });
      }
    }

    if ('short_name' in data) {
      const { short_name } = data;
      const account = await createAccount(short_name);

      if (account.ok) {
        setGlobalStore({ isAuth: true });
        navigate('/profile');
      }

      if (!account.ok) {
        setError('short_name', { type: 'async', message: 'async error' });
      }
    }
  };

  const changeStatus = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isStatus === 'login') setStatus('signup');
    if (isStatus === 'signup') setStatus('login');

    unregister('token');
    unregister('short_name');
  };

  return (
    <>
      <Header>
        <Title>Старт</Title>
        <Subtitle>Начать пользоваться сервисом</Subtitle>
      </Header>

      <EmptySpace></EmptySpace>

      {isStatus === 'login' && (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputStyle
              type="text"
              placeholder="Введите ваш токен..."
              {...register('token', { required: true })}
            />

            {('token' in errors && errors.token?.type === 'required' && (
              <ErrorPin>поле не может быть пустым</ErrorPin>
            )) ||
              ('token' in errors && errors.token?.type === 'invalid_token' && (
                <ErrorPin>неверный токен</ErrorPin>
              )) ||
              ('token' in errors && errors.token?.type === 'async' && (
                <ErrorPin>ошибка на стороне сервера</ErrorPin>
              ))}
          </InputContainer>

          <Button>Войти</Button>

          <Link onClick={changeStatus}>или зарегистрироваться</Link>
        </FormStyle>
      )}

      {isStatus === 'signup' && (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputStyle
              type="text"
              placeholder="Введите ваше имя..."
              {...register('short_name', { required: true, maxLength: 32, minLength: 2 })}
            />
            <PinContainer>
              <InformationPin>потом можно изменить</InformationPin>

              {('short_name' in errors && errors.short_name?.type === 'minLength' && (
                <ErrorPin>минимум 2 символа</ErrorPin>
              )) ||
                ('short_name' in errors && errors.short_name?.type === 'required' && (
                  <ErrorPin>поле не может быть пустым</ErrorPin>
                )) ||
                ('short_name' in errors && errors.short_name?.type === 'maxLength' && (
                  <ErrorPin>максимум 32 символа</ErrorPin>
                )) ||
                ('short_name' in errors && errors.short_name?.type === 'async' && (
                  <ErrorPin>ошибка на стороне сервера</ErrorPin>
                ))}
            </PinContainer>
          </InputContainer>

          <Button>зарегистрироваться</Button>

          <Link onClick={changeStatus}>или войти</Link>
        </FormStyle>
      )}
    </>
  );
};
