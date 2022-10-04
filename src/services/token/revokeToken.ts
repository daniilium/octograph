import { getToken, removeToken, setToken } from '.';
import { API_URL } from '../constants';

export const revokeToken = async () => {
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
    alert('Error revoke token');
    console.log('Error revokeAccessToken', json);
  }
};
