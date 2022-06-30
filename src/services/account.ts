import { API_URL } from './сonstants';
import { getToken, setToken } from './cookies';
import { CreateAccount, AccountInfo, ErrorMessage } from './Interfaces';

export const createAccount = async (shortName: string) => {
  const response = await fetch(`${API_URL}/createAccount?short_name=${shortName}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const json: CreateAccount = await response.json();

  if (json.ok) setToken(json.result.access_token);

  return json;
};

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

export const getAccount = async (): Promise<AccountInfo | ErrorMessage> => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  return getAccountByToken(token);
};
