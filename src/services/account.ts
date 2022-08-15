import { API_URL } from '../helpers/constants';
import { getToken, setToken } from './token';
import { CreateAccount, AccountInfo, ErrorMessage } from '../helpers/interfaces';

export const createAccount = async (shortName: string) => {
  const response = await fetch(`${API_URL}/createAccount?short_name=${shortName}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const json: CreateAccount | ErrorMessage = await response.json();

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

export const changeShortNameAccount = async (shortName: string) => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  const response = await fetch(
    `${API_URL}/editAccountInfo?access_token=${token}&short_name=${shortName}`,
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

export const changeAuthorNameAccount = async (authorName: string) => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  const response = await fetch(
    `${API_URL}/editAccountInfo?access_token=${token}&author_name=${authorName}`,
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

export const changeAuthorUrlAccount = async (authorUrl: string) => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  const response = await fetch(
    `${API_URL}/editAccountInfo?access_token=${token}&author_url=${authorUrl}`,
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
