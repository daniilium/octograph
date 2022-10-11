import { AccountInfo, ErrorMessage } from '../types';
import { getToken } from '../token';
import { getAccountByToken } from './';

export const getAccount = async (): Promise<AccountInfo | ErrorMessage> => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  return getAccountByToken(token);
};
