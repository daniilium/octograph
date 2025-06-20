import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

import { setToken } from '@/features/auth-token'

import { useGlobalContext } from '@/shared/model/global-context'
import { Button } from '@/shared/ui/atoms/button'
import { Link } from '@/shared/ui/atoms/link'
import { FormContainer } from '@/shared/ui/atoms/form-container'
import { InfoPin } from '@/shared/ui/atoms/info-pin'
import { FormTextField } from '@/shared/ui/organisms/form-text-field'
import { Stack } from '@/shared/ui/templates/stack'

import { signUpFormRules } from '../model/sign-up-form-rules'
import { useSignUp } from '../model/use-sign-up'

type SignUpForm = {
  shortName: string
}

export function SignUpForm() {
  const navigate = useNavigate()
  const { setAuthenticated } = useGlobalContext()

  const {
    data: account,
    error,
    actionCallback: signUp,
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
      setAuthenticated(true)
      navigate({ to: '/profile' })
    }

    if (isError && error) {
      setError('shortName', { message: error })
    }
  }, [isSuccess, isError, account, error, setAuthenticated, navigate, setError])
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="8px">
        <FormTextField
          name="shortName"
          placeholder="short name"
          control={control}
          rules={signUpFormRules.shortName}
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
