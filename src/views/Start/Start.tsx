import { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Header, Title, Subtitle, grayColor, redColor } from '../../css-in-js/global';
import { getAccountByToken } from '../../services/account';
import { ErrorMessage } from '../../services/Interfaces';

const InputStyle = styled.input`
  font-family: 'Lucida Grande', sans-serif;
  font-size: 18px;
  padding-left: 16px;
  width: 100%;
  height: 37px;
  border: 1px solid #333333;
  border-radius: 18px;
  color: ${grayColor};
`;

const Button = styled.button`
  margin-top: 16px;
  cursor: pointer;
  font-family: 'Lucida Grande', sans-serif;
  font-size: 18px;
  padding: 8px 16px;
  background-color: white;
  border: 2px solid #333333;
  border-radius: 18px;
  text-transform: uppercase;
`;

const Link = styled.a`
  font-family: 'Lucida Grande', sans-serif;
  color: ${grayColor};
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 64px;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const EmptySpace = styled.div`
  height: 100%;
`;

const InformationPin = styled.p`
  font-family: 'Lucida Grande';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${grayColor};

  &:before {
    content: '•';
    margin-right: 4px;
  }
`;

const ErrorPin = styled(InformationPin)`
  color: ${redColor};
`;

const PinContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

type Props = {
  status: 'login' | 'signup';
};

export const Start = (props: Props) => {
  const [isStatus, setStatus] = useState(props.status);
  const navigate = useNavigate();
  const id = useParams().id;

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) onSubmit({ token: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (data: any) => {
    if (data?.token) {
      const account = await getAccountByToken(data.token);
      if (account.ok) navigate('/account');
      if (!account.ok) {
        const error = (account as ErrorMessage).error;
        if (error === 'ACCESS_TOKEN_INVALID')
          setError('token', { type: 'invalid_token', message: 'Invalid token' });
        else setError('token', { type: 'async', message: 'async error' });
      }
    }

    if (data['short_name']) {
      setError('short_name', { type: 'async', message: 'async error' });
      // console.log('name', data['short_name']);
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
            {(errors.token?.type === 'required' && (
              <ErrorPin>поле не может быть пустым</ErrorPin>
            )) ||
              (errors.token?.type === 'async' && <ErrorPin>ошибка на стороне сервера</ErrorPin>) ||
              (errors.token?.type === 'invalid_token' && <ErrorPin>неверный токен</ErrorPin>)}
          </InputContainer>

          <Button>Войти</Button>

          <Link onClick={changeStatus} href="">
            или зарегистрироваться
          </Link>
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

              {(errors.short_name?.type === 'minLength' && (
                <ErrorPin>минимум 2 символа</ErrorPin>
              )) ||
                (errors.short_name?.type === 'required' && (
                  <ErrorPin>поле не может быть пустым</ErrorPin>
                )) ||
                (errors.short_name?.type === 'maxLength' && (
                  <ErrorPin>максимум 32 символа</ErrorPin>
                )) ||
                (errors.short_name?.type === 'async' && (
                  <ErrorPin>ошибка на стороне сервера</ErrorPin>
                ))}
            </PinContainer>
          </InputContainer>

          <Button>зарегистрироваться</Button>

          <Link onClick={changeStatus} href="">
            или войти
          </Link>
        </FormStyle>
      )}
    </>
  );
};
