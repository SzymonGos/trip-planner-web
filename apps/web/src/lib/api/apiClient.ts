import { API_URL } from '../config';

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type TApiClientOptions = {
  method?: THttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export async function apiClient<T>(endpoint: string, options: TApiClientOptions = {}): Promise<T> {
  const { method = 'GET', body, headers, cache, next } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? 'API request failed');
  }

  return response.json();
}
