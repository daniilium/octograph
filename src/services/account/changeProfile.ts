import { API_URL } from '../constants';
import { getToken } from '../token';
import { CreateAccount, ErrorMessage, ProfileForm } from '../types';

export const changeProfile = async (
  userForm: ProfileForm
): Promise<CreateAccount | ErrorMessage> => {
  const { shortName, authorName, authorUrl } = userForm;
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  const response = await fetch(
    `${API_URL}/editAccountInfo?access_token=${token}&short_name=${shortName}&author_name=${authorName}&author_url=${authorUrl}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const json = await response.json();
  return json;
};
