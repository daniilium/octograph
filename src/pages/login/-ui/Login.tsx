


import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';

import { useGlobalContext } from '@/shared/model/GlobalContext';

import { Button, FormContainer, InfoPin, Link } from '@/shared/ui/atoms';
import { FormTextField } from '@/shared/ui/molecules';
import { Header } from '@/shared/ui/organisms';
import { Stack } from '@/shared/ui/templates';
import { getAccountByToken } from '@/shared/api/getAccountByToken';

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
  const navigate = useNavigate()
    const { changeIsAuth } = useGlobalContext();
  
  //   const { token } = useParams();
  
    const {
      handleSubmit,
      control,
      setError,
      formState: { errors },
    } = useForm<LoginForm>({
      defaultValues: {},
    });
  
    const onSubmit = async (data: LoginForm) => {
      

      const { token } = data;
      const account = await getAccountByToken(token);
      if (account.ok) {
        changeIsAuth(true);
         navigate({to: '/profile'});
      } else {
        setError('token', { message: 'error validate on server' });
      }
    };
  
    // useEffect(() => {
    //   if (token) {
    //     reset({ token });
    //     handleSubmit(onSubmit)();
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [token]);
  
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
            <Link to="/signup">or register</Link>
          </Stack>
        </FormContainer>
      </>
    );
  }