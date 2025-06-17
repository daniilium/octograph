import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from '@tanstack/react-router'

import { useGlobalContext } from '@/shared/model/GlobalContext'

import { Button, FormContainer, InfoPin, Link } from '@/shared/ui/atoms'
import { FormTextField } from '@/shared/ui/molecules'
import { Header } from '@/shared/ui/organisms'
import { Stack } from '@/shared/ui/templates'

import { useEffect } from 'react'
import { setToken } from '@/features/auth-token'
import { loginFormRules } from '../-model/loginFormRules'
import { useGetAccountByToken } from '@/shared/model/useGetAccountByToken'

interface LoginForm {
  token: string
}

export function Login() {
  // Сценарий: нет токена
  const navigate = useNavigate()
  const { changeIsAuth } = useGlobalContext()

  const {
    data: account,
    error,
    actionCallback,
    isPending,
    isSuccess,
    isError,
  } = useGetAccountByToken()

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {},
  })

  const onSubmit = async (data: LoginForm) => {
    await actionCallback({ token: data.token })
  }

  useEffect(() => {
    if (isSuccess && account?.ok) {
      setToken(getValues('token'))
      changeIsAuth(true)
      navigate({ to: '/profile' })
    }

    if (isError && error) {
      setError('token', { message: error })
    }
  }, [isSuccess, isError, error])

  // Сценарий: есть токен в параметрах URL
  const { token } = useParams({ strict: false })

  useEffect(() => {
    if (token) {
      setValue('token', token)
      handleSubmit(onSubmit)()
    }
  }, [token])

  return (
    <>
      <Header title="Login" subtitle="sign in" />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="8">
          <FormTextField
            placeholder="your token"
            name="token"
            control={control}
            rules={loginFormRules.login}
            error={errors?.token}
          />

          <InfoPin>instead of username and password</InfoPin>
        </Stack>

        <Stack direction="column" align="center" gap="8px">
          <Button disabled={isPending}>Sign in</Button>
          <Link to="/signup">or register</Link>
        </Stack>
      </FormContainer>
    </>
  )
}
