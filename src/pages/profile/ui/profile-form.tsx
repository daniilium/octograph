import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { getToken } from '@/features/auth-token'

import { FormTextField } from '@/shared/ui/organisms/form-text-field'
import { Button } from '@/shared/ui/atoms/button'
import { useGlobalContext } from '@/shared/model/global-context'
import { Stack } from '@/shared/ui/templates/stack'
import { InfoPin } from '@/shared/ui/atoms/info-pin'
import { useGetAccountByToken } from '@/shared/model/use-get-account-by-token'

import { profileFormRules } from '../model/profile-form-rules'
import { convertDtoUser } from '../model/convert-dto-user'
import { useEditAccountInfo } from '../model/use-edit-account-info'

export type ProfileForm = {
  shortName: string
  authorName: string
  authorUrl: string
}

type Props = {
  setAuthUrl: (authUrl: string) => void
}

export function ProfileForm({ setAuthUrl }: Props) {
  const { setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({ title: 'Profile', subtitle: 'Settings' })
  }, [setHeader])

  const {
    handleSubmit,
    control,
    formState: { errors },
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
      setAuthUrl(account.result.auth_url)
      setValues(convertDtoUser(account))
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
      setValues(convertDtoUser(accountEdit))
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
          <Button type="submit">Change user data</Button>
        </Stack>
      </Stack>
    </form>
  )
}
