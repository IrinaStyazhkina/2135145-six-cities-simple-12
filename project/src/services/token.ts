const AUTH_TOKEN_SIX_CITIES_KEY_NAME = 'six-cities-token';

export type Token = string;
export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_SIX_CITIES_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_SIX_CITIES_KEY_NAME, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_SIX_CITIES_KEY_NAME);
};
