import { API_URL } from '../helpers/constants';
import { getToken } from './cookies';

export const getPageList = async (offset = 0, limit = 20) => {
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

export const getPage = async (path: string) => {
  const response = await fetch(`${API_URL}/getPage/${path}?return_content=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const json = await response.json();

  return json;
};
