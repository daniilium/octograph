import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

import { Button, FormContainer, Link, InfoPin } from '@/shared/ui/atoms'
import { FormTextField } from '@/shared/ui/molecules'

import { Stack } from '@/shared/ui/templates'

import { useSignUp } from '../-model/useSignUp'
import { setToken } from '@/features/auth-token'
import { useEffect } from 'react'
import { useGlobalContext } from '@/shared/model/global-context'

type SignUpForm = {
  shortName: string
}

const rules = {
  shortName: {
    required: { value: true, message: 'short name is required' },
    minLength: { value: 1, message: 'min length 1 characters' },
    maxLength: { value: 32, message: 'max length 6032 characters' },
  },
}

export function SignUp() {
  const navigate = useNavigate()
  const { changeIsAuth, setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Sign up',
      subtitle: 'create new token',
    })
  }, [])

  const {
    data: account,
    error,
    signUp,
    isPending,
    isSuccess,
    isError,
  } = useSignUp()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>()

  const onSubmit = async (data: SignUpForm) => {
    await signUp(data)
  }

  useEffect(() => {
    if (isSuccess && account?.ok) {
      setToken(account.result.access_token)
      changeIsAuth(true)
      navigate({ to: '/profile' })
    }

    if (isError && error) {
      setError('shortName', { message: error })
    }
  }, [isSuccess, isError, account, error, changeIsAuth, navigate, setError])

  return (
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
        <Button disabled={isPending}>Create token</Button>
        <Link to="/login">or sign in</Link>
      </Stack>
    </FormContainer>
  )
}
