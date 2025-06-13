import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getToken } from '@/entities/auth-token'

import { ProfileForm } from '@/shared/model/types'
import { Button, InfoPin, Link, MainText } from '@/shared/ui/atoms'
import { FormTextField } from '@/shared/ui/molecules'
import { Header } from '@/shared/ui/organisms'
import { Stack } from '@/shared/ui/templates'
import { useGetAccountByToken } from '@/shared/model/useGetAccountByToken'

import { profileFormRules } from '../-model/profileFormRules'
import { convertDtoUser } from '../-model/convertDtoUser'
import { useEditAccountInfo } from '../-model/useChangeAccountData'

export function Profile() {
  const [user, setUser] = useState<ProfileForm>()
  const [authUrl, setAuthUrl] = useState<string>()
  const [change, setChange] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<ProfileForm>()

  const setValues = (data: ProfileForm) => {
    setValue('shortName', data.shortName)
    setValue('authorName', data.authorName)
    setValue('authorUrl', data.authorUrl)
  }

  // Сценарий: запрашиваем данные
  const {
    data: account,
    error,
    actionCallback,
    isSuccess,
    isError,
  } = useGetAccountByToken()

  useEffect(() => {
    // запрашиваем данные первый раз
    const token = getToken()
    if (!isSuccess && !isError && token) actionCallback({ token })

    // устанавливаем данные
    if (isSuccess && account?.ok) {
      const newUserData = convertDtoUser(account)
      setUser(newUserData)
      setAuthUrl(account.result.auth_url)
      setValues(newUserData)
    }

    // обрабатываем ошибку
    if (isError && error) {
      alert(error)
    }
  }, [isSuccess, account])

  // Сценарий: изменяем данные
  const {
    data: accountEdit,
    error: errorEdit,
    actionCallback: actionCallbackEdit,
    isSuccess: isSuccessEdit,
    isError: isErrorEdit,
  } = useEditAccountInfo()

  useEffect(() => {
    // устанавливаем изменённые данные
    if (isSuccessEdit && accountEdit?.ok) {
      const newUserData = convertDtoUser(accountEdit)
      setUser(newUserData)
      setValues(newUserData)
    }

    // обрабатываем ошибку
    if (isErrorEdit && errorEdit) {
      alert(errorEdit)
    }
  }, [isSuccessEdit, accountEdit])

  const onSubmit = async (form: ProfileForm) => {
    const token = getToken()

    if (token) await actionCallbackEdit({ token, userForm: form })

    if (!token) alert('You are not logged in')
  }

  return (
    <>
      <Header title="Profile" subtitle="Managing your account" />

      <Stack gap="16px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="16px">
            <Stack>
              <FormTextField
                label="Short name:"
                placeholder="short name"
                name="shortName"
                control={control}
                rules={profileFormRules.shortName}
                error={errors?.shortName}
              />

              <InfoPin>only you can see</InfoPin>
            </Stack>

            <Stack>
              <FormTextField
                label="Author name:"
                placeholder="author name"
                name="authorName"
                control={control}
                rules={profileFormRules.authorName}
                error={errors?.authorName}
              />

              <InfoPin>may be empty</InfoPin>
              <InfoPin>will only change in the new articles</InfoPin>
              <InfoPin>displayed below the article's title</InfoPin>
            </Stack>

            <Stack>
              <FormTextField
                label="Author url:"
                placeholder="author url"
                name="authorUrl"
                control={control}
                rules={profileFormRules.authorUrl}
                error={errors?.authorUrl}
              />

              <InfoPin>may be empty</InfoPin>
              <InfoPin>will only change in the new articles</InfoPin>
              <InfoPin>
                must begin with "http://" or "https://" or "mailto:"
              </InfoPin>
              <InfoPin>
                opened when users click on the author's name below the title
              </InfoPin>
            </Stack>

            <Stack align="left">
              <Button onClick={() => setChange(true)}>Change user data</Button>
            </Stack>
          </Stack>
        </form>

        <hr />

        <Stack>
          <Link to={authUrl} target="_blank">
            Authorize a browser on telegra.ph
          </Link>
          <InfoPin>link is valid for 5 minutes</InfoPin>
          <InfoPin>refreshing the page creates a new link</InfoPin>
        </Stack>

        <Link to="/token">Management token</Link>

        <Link to="/logout">Logout</Link>
      </Stack>
    </>
  )
}
