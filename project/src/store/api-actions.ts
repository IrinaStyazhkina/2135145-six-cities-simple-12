import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthStatus } from '../const/auth-status';
import { APIRoute, AppRoute } from '../const/routes';
import { clearToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, redirectToRoute, setAuthorizationStatus, setDataLoading, setUserData } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoading(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setDataLoading(false));
    dispatch(loadOffers(data));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const {data} = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthStatus.NoAuth));
    }
  });

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    clearToken();
    dispatch(setAuthorizationStatus(AuthStatus.NoAuth));
  });
