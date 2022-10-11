import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getAccountByToken } from '../../services/account';
import { useGlobalContext } from '../../components/other/GlobalContext';

import { Button, FormContainer, InfoPin, Link } from '../../components/atoms';
import { FormTextField } from '../../components/molecules';
import { Header } from '../../components/organisms';
import { Stack } from '../../components/templates';

const rules = {
  login: {
    required: { value: true, message: 'login is required' },
    minLength: { value: 60, message: 'min length 60 characters' },
    maxLength: { value: 60, message: 'max length 60 characters' },
  },
};

interface LoginForm {
  token: string;
}

export function Login() {
  const { GlobalStore, setGlobalStore } = useGlobalContext();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      reset({ token });
      handleSubmit(onSubmit)();
    }
  }, [token]);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    defaultValues: {},
  });

  const onSubmit = async (data: LoginForm) => {
    const { token } = data;
    const account = await getAccountByToken(token);
    if (account.ok) {
      setGlobalStore({ ...GlobalStore, isAuth: true });
      navigate('/profile');
    } else {
      setError('token', { message: 'error validate on server' });
    }
  };

  return (
    <>
      <Header title="Login" subtitle="sign in" />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="8">
          <FormTextField
            placeholder="your token"
            name="token"
            control={control}
            rules={rules.login}
            error={errors?.token}
          />

          <InfoPin>instead of username and password</InfoPin>
        </Stack>

        <Stack direction="column" align="center" gap="8px">
          <Button>Sign in</Button>
          <Link href="/signup">or register</Link>
        </Stack>
      </FormContainer>
    </>
  );
}
