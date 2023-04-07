import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';

const BASE_URL = 'https://12.react.pages.academy/six-cities-simple';
const TIMEOUT = 5000;


const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if(token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if(error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
