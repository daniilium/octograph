import { getToken } from '@/shared/api/token';
import { AccountInfo, ErrorMessage } from '@/shared/model/types';

import { getAccountByToken } from '@/shared/api/getAccountByToken';


export const getAccount = async (): Promise<AccountInfo | ErrorMessage> => {
  const token = getToken();

  if (!token) return { ok: false, error: 'No token' };
  return getAccountByToken(token);
};
