import cookies from 'browser-cookies';

export const isAuthorized = () => {
  return Boolean(cookies.get('token'));
};

export const getToken = () => {
  const token = cookies.get('token');
  if (token) return decrypto(token);
  else console.log('No token');
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
