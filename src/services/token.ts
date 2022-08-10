import cookies from 'browser-cookies';
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
