import { API_URL } from '../constants';
import { getToken } from '../token';
import { GetPageList } from '../types';

export const getPageList = async (offset = 0, limit = 20): Promise<GetPageList> => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/getPageList?access_token=${token}&offset=${offset}&limit=${limit}`,
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
