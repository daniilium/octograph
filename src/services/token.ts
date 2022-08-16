import cookies from 'browser-cookies';
import { API_URL } from '../helpers/constants';
import { getAccountByToken } from './account';

export async function validateToken() {
  const token = getToken();
  if (!token) return false;

  const user = await getAccountByToken(token);
  if (!user.ok) return false;
  return true;
}

export const existToken = () => {
  const token = getToken();
  return Boolean(token);
};

export const getToken = () => {
  const token = cookies.get('token');
  if (token) return decrypto(token);
  else return null;
};

export const setToken = (token: string) => {
  cookies.set('token', crypto(token), { expires: 1 });
};

export const removeToken = () => {
  cookies.erase('token');
};

function crypto(str: string) {
  return btoa(str);
}

function decrypto(str: string) {
  return atob(str);
}

export const revokeAccessToken = async () => {
  const token = getToken();
  if (!token) return;
  const response = await fetch(`${API_URL}/revokeAccessToken?access_token=${token}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const json = await response.json();

  if (json.ok) {
    const result = json.result;
    const newToken = result.access_token;
    removeToken();
    setToken(newToken);
  }

  if (!json.ok) {
    console.log('Error revokeAccessToken', json);
  }
};
