import axios from 'axios';

const BASE_URL = 'https://12.react.pages.academy/six-cities-simple';
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  return api;
};
