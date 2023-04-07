import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthStatus } from '../const/auth-status';
import { APIRoute, AppRoute } from '../const/routes';
import { clearToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { NewReview, Reviews } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import {
  loadOffers,
  redirectToRoute,
  setAuthorizationStatus,
  setComments,
  setCurrentOffer,
  setDataLoading,
  setOffersNearBy,
  setUserData
} from './action';

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

export const fetchOfferData = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchOfferData',
  async (offerId, {dispatch, extra: api}) => {
    const currentOfferPromise = api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    const nearByOffersPromise = api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    const commentsPromise = api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);

    await Promise.all([currentOfferPromise, nearByOffersPromise, commentsPromise])
      .then(([currentOffer, nearByOffers, comments, ]) => {
        if(!currentOffer) {
          dispatch(redirectToRoute(AppRoute.NotFound));
          return;
        }
        dispatch(setCurrentOffer(currentOffer.data));
        dispatch(setOffersNearBy(nearByOffers.data));
        dispatch(setComments(comments.data));
      }).catch(() => {
        dispatch(redirectToRoute(AppRoute.NotFound));
      });
  },
);

export const sendNewComment = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/sendComment',
  async({comment, rating, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
    dispatch(setComments(data));
  });
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
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData({
        id: data.id,
        email: data.email,
        token: data.token,
      }));
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
