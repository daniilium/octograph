import { API_URL } from '../constants';
import { getToken } from '../token';

export const cleanupPage = async (path: string) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/editPage/${path}?access_token=${token}&title=Empty+Page&author_name=Anonymous&content=[%7B%22tag%22:%22p%22,%22children%22:[%22%20%22]%7D]&return_content=true`,
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
