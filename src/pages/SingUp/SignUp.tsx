import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, FormContainer, Link, InfoPin } from '../../components/atoms';
import { FormTextField } from '../../components/molecules';
import { Header } from '../../components/organisms';
import { Stack } from '../../components/templates';
import { useGlobalContext } from '../../components/other/GlobalContext';
import { createAccount } from '../../services/account';

type SignUpForm = {
  shortName: string;
};

export function SignUp() {
  const { GlobalStore, setGlobalStore } = useGlobalContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();

  const rules = {
    shortName: {
      required: { value: true, message: 'short name is required' },
      minLength: { value: 1, message: 'min length 1 characters' },
      maxLength: { value: 32, message: 'max length 6032 characters' },
    },
  };

  const onSubmit = async (data: SignUpForm) => {
    const { shortName } = data;
    const account = await createAccount(shortName);
    if (account.ok) {
      setGlobalStore({ ...GlobalStore, isAuth: true });
      navigate('/profile');
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
          <Link href="/login">or sign in</Link>
        </Stack>
      </FormContainer>
    </>
  );
}
