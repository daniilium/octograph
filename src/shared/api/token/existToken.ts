import { getToken } from '.';

export const existToken = () => {
  const token = getToken();
  return Boolean(token);
};
