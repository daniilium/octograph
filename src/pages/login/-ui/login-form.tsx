import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from '@tanstack/react-router'

import { setToken } from '@/features/auth-token'

import { useGlobalContext } from '@/shared/model/global-context'
import { Button } from '@/shared/ui/atoms/Button'
import { FormContainer } from '@/shared/ui/atoms/FormContainer'
import { InfoPin } from '@/shared/ui/atoms/InfoPin'
import { FormTextField } from '@/shared/ui/organisms/form-text-field'
import { Stack } from '@/shared/ui/templates/Stack'
import { Link } from '@/shared/ui/atoms/Link'

import { loginFormRules } from '../-model/login-form-rules'
import { useGetAccountByToken } from '@/shared/model/use-get-account-by-token'

interface LoginForm {
  token: string
}

export function LoginForm() {
  const { changeIsAuth } = useGlobalContext()

  // Сценарий: нет токена
  const navigate = useNavigate()

  const {
    data: account,
    error,
    actionCallback: getAccount,
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
    await getAccount({ token: data.token })
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
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="8px">
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
  )
}
