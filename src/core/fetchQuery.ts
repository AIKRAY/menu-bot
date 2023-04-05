import { API_URL } from 'core/constants';

// @ts-ignore
// Telegram webapp object
const tg = window.Telegram?.WebApp;

const ITIN_DATA = tg.initData;
/*
 * to test without telegram instead tg.initData use your test initData
 * example: 'query_id=xxx&user=%22%3A%22xxx%22%2C%22first_name%22%3A%22xxx%22%2C%22last_name%22%3A%22xxx%22%2C%22username%22%3A%22xxx%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1680733421&hash=xxx'
 */

type QueryOptions<Body> = {
  path: string;
  body?: Body;
  params?: Record<string, string>;
  headers?: Record<string, string | number>;
} & Omit<RequestInit, 'body'>;

export const fetchQuery = async <ResponseType, RequestBody = unknown>({
  path,
  body,
  headers,
  params,
  ...options
}: QueryOptions<RequestBody>): Promise<ResponseType> => {
  const queryHeaders = new Headers({
    authorization: ITIN_DATA,
    ...headers,
  });

  let url = `${API_URL}${path}`;
  if (params) url += `${new URLSearchParams(params)}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: queryHeaders,
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = (await response.json()) as ResponseType;

  return data;
};
