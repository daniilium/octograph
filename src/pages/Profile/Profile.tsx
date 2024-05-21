import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CreateAccount, ErrorMessage, ProfileForm } from '@/services/types';

import { Button, InfoPin, Link, MainText } from '@/components/atoms';
import { FormTextField } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { Stack } from '@/components/templates';

import { getAccount } from '../../services/account';
import { changeProfile } from '../../services/account';

const rules = {
  shortName: {
    required: { value: true, message: 'short name is required' },
    maxLength: { value: 32, message: 'max length 32 characters' },
  },
  authorName: {
    maxLength: { value: 128, message: 'max length 128 characters' },
  },
  authorUrl: {
    maxLength: { value: 512, message: 'max length 512 characters' },
    validate: {
      test: (value: string) => {
        if (!value.length) return true;

        return (
          value.startsWith('http://') ||
          value.startsWith('https://') ||
          value.startsWith('mailto:') ||
          'wrong start of input'
        );
      },
    },
  },
};

const convertToUser = (raw: CreateAccount) => {
  const { short_name, author_name, author_url } = raw.result;
  return { shortName: short_name, authorName: author_name, authorUrl: author_url };
};

export function Profile() {
  const [user, setUser] = useState<ProfileForm>();
  const [authUrl, setAuthUrl] = useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<ProfileForm>({
    defaultValues: useMemo(() => user, [user]),
  });

  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const get = async () => {
      const account = await getAccount();

      if (account.ok) {
        const newUserData = convertToUser(account);
        setUser(newUserData);
        setAuthUrl(account.result.auth_url);

        // needed to update defaultValues
        reset(newUserData);
      } else alert((account as ErrorMessage).error);
    };

    get();
  }, [reset]);

  const onSubmit = async (form: ProfileForm) => {
    setChange(false);

    if (Object.keys(dirtyFields).length === 0) return;

    const newUserData = await changeProfile(form);
    if (newUserData.ok) setUser(convertToUser(newUserData));
    else alert('error request change profile data');
  };

  return (
    <>
      <Header title="Profile" subtitle="Managing your account" />

      <Stack gap="16px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="16px">
            <Stack>
              {change ? (
                <>
                  <FormTextField
                    label="Short name:"
                    placeholder="short name"
                    name="shortName"
                    control={control}
                    rules={rules.shortName}
                    error={errors?.shortName}
                  />
                </>
              ) : (
                <MainText>
                  <b>Short name:</b> {user?.shortName}
                </MainText>
              )}

              <InfoPin>only you can see</InfoPin>
            </Stack>

            <Stack>
              {change ? (
                <>
                  <FormTextField
                    label="Author name:"
                    placeholder="author name"
                    name="authorName"
                    control={control}
                    rules={rules.authorName}
                    error={errors?.authorName}
                  />
                </>
              ) : (
                <MainText>
                  <b>Author name:</b> {user?.authorName || 'empty'}
                </MainText>
              )}

              <InfoPin>may be empty</InfoPin>
              <InfoPin>will only change in the new articles</InfoPin>
              <InfoPin>displayed below the article's title</InfoPin>
            </Stack>

            <Stack>
              {change ? (
                <>
                  <FormTextField
                    label="Author url:"
                    placeholder="author url"
                    name="authorUrl"
                    control={control}
                    rules={rules.authorUrl}
                    error={errors?.authorUrl}
                  />
                </>
              ) : (
                <MainText>
                  <b>Author url:</b> {user?.authorUrl || 'empty'}
                </MainText>
              )}

              <InfoPin>may be empty</InfoPin>
              <InfoPin>will only change in the new articles</InfoPin>
              <InfoPin>must begin with "http://" or "https://" or "mailto:"</InfoPin>
              <InfoPin>opened when users click on the author's name below the title</InfoPin>
            </Stack>

            {change && (
              <Stack align="left">
                <Button type="submit">Save new user data</Button>
              </Stack>
            )}

            {!change && (
              <Stack align="left">
                <Button onClick={() => setChange(true)}>Change user data</Button>
              </Stack>
            )}
          </Stack>
        </form>

        <hr />

        <Stack>
          <Link href={authUrl} target="_blank">
            Authorize a browser on telegra.ph
          </Link>
          <InfoPin>link is valid for 5 minutes</InfoPin>
          <InfoPin>refreshing the page creates a new link</InfoPin>
        </Stack>

        <Link href="/token">Management token</Link>

        <Link href="/logout">Logout</Link>
      </Stack>
    </>
  );
}
