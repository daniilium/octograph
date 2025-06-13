

import { useForm } from 'react-hook-form';


import { Button, FormContainer, Link, InfoPin } from '@/shared/ui/atoms';
import { FormTextField } from '@/shared/ui/molecules';
import { Header } from '@/shared/ui/organisms';
import { Stack } from '@/shared/ui/templates';
import { useGlobalContext } from '@/shared/model/GlobalContext';

import { useNavigate } from '@tanstack/react-router';
import { createAccount } from '../-api/createAccount';

type SignUpForm = {
  shortName: string;
};

const rules = {
  shortName: {
    required: { value: true, message: 'short name is required' },
    minLength: { value: 1, message: 'min length 1 characters' },
    maxLength: { value: 32, message: 'max length 6032 characters' },
  },
};

export function SignUp() {
  const navigate = useNavigate()
  const { changeIsAuth } = useGlobalContext();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    const { shortName } = data;
    const account = await createAccount(shortName);

    if (account.ok) {      
      changeIsAuth(true);
      navigate({to: '/profile'})
    } else {
      setError('shortName', { message: 'error validate on server' });
    }
  };

  return (
    <>
      <Header title="Sign up" subtitle="create new token" />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="8">
          <FormTextField
            name="shortName"
            placeholder="short name"
            control={control}
            rules={rules.shortName}
            error={errors?.shortName}
          />

          <InfoPin>can be changed later</InfoPin>
        </Stack>

        <Stack direction="column" align="center" gap="8px">
          <Button>Create token</Button>
          <Link to="/login">or sign in</Link>
        </Stack>
      </FormContainer>
    </>
  );
}
