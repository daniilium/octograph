import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from '@tanstack/react-router'

import { Button, FormContainer, InfoPin, Link } from '@/shared/ui/atoms'
import { FormTextField } from '@/shared/ui/molecules'
import { Stack } from '@/shared/ui/templates'
import { setToken } from '@/features/auth-token'
import { useGetAccountByToken } from '@/shared/model/useGetAccountByToken'

import { loginFormRules } from '../-model/loginFormRules'
import { useGlobalContext } from '@/shared/model/global-context'

interface LoginForm {
  token: string
}

export function Login() {
  const { changeIsAuth, setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Login',
      subtitle: 'management telegra.ph',
    })
  }, [])

  // Сценарий: нет токена
  const navigate = useNavigate()

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
