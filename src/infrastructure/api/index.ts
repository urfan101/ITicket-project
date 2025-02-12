import { deleteAccessToken } from '@/business/utils/deleteAccessToken';
import { HttpError } from '@infrastructure/api/HttpError.ts';
import { getAccessToken } from '@infrastructure/utils/getAccessToken.ts';
import { stringify } from '@infrastructure/utils/stringify.ts';
import axios, { AxiosError, InternalAxiosRequestConfig, Method } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API as string,
  timeout: 60000,
});


const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
interface ErrorResponse {
  error: string;
}
api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken: string = getAccessToken();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
);

type HttpParams = Record<string, never>;

type HttpProps<D = unknown> = {
  url: string;
  params?: HttpParams;
  method?: Method;
  data?: D;
  headers?: Record<string, string>;
};

export const http = async <T, D = unknown>({
  url,
  params = {},
  headers = {},
  method = 'GET',
  data = {} as D,
}: HttpProps<D>): Promise<T> => {
  const query = params
    ? `?${stringify({
        ...params,
      })}`
    : '';

  try {
    const response = await api.request<T>({
      url: `${url}${query}`,
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
      data,
    });

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const error = e as AxiosError;
      if (error.response) {
        error.response.status === 401 && deleteAccessToken(); 
        const errorData = error.response.data as ErrorResponse;
        throw new HttpError(errorData.error, error.response.status || 500);
      }
      
    }

    throw new HttpError('Unexpected error', 500);
  }
};
