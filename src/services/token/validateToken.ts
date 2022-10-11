import { getToken } from '.';
import { getAccountByToken } from '../account';

export async function validateToken() {
  const token = getToken();
  if (!token) return false;

  const user = await getAccountByToken(token);
  if (!user.ok) return false;
  return true;
}
