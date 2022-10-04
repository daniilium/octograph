import { API_URL } from '../constants';
import { AccountInfo, ErrorMessage } from '../types';
import { setToken } from '../token';

export const getAccountByToken = async (token: string): Promise<AccountInfo | ErrorMessage> => {
  const response = await fetch(
    `${API_URL}/getAccountInfo?access_token=${token}&fields=["short_name","author_name","author_url","auth_url","page_count"]`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const json = await response.json();

  if (json.ok) setToken(token);

  return json;
};
