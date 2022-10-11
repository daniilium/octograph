import { API_URL } from '../constants';
import { CreateAccount, ErrorMessage } from '../types';
import { setToken } from '../token';

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
