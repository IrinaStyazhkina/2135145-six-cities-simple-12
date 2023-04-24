import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const/routes';
import { clearToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer, OfferData } from '../types/offer';
import { NewReview, Reviews } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import {
  redirectToRoute,
} from './action';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferData = createAsyncThunk<OfferData | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchOfferData',
  async (offerId, { dispatch, extra: api }) => {
    const currentOfferPromise = api.get<Offer>(`${ APIRoute.Offers }/${ offerId }`);
    const nearByOffersPromise = api.get<Offer[]>(`${ APIRoute.Offers }/${ offerId }/nearby`);
    const commentsPromise = api.get<Reviews>(`${ APIRoute.Comments }/${ offerId }`);

    const data: OfferData | null = await Promise.all([currentOfferPromise, nearByOffersPromise, commentsPromise])
      .then(([currentOffer, nearByOffers, comments,]) => {
        if (!currentOffer) {
          dispatch(redirectToRoute(AppRoute.NotFound));
          return null;
        }
        return {
          currentOffer: currentOffer.data,
          offersNearBy: nearByOffers.data,
          comments: comments.data,
        };
      });
    return data;
  });

export const sendNewComment = createAsyncThunk<Reviews, NewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/sendComment',
  async ({ comment, rating, hotelId }, { dispatch, extra: api }) => {
    const { data } = await api.post<Reviews>(`${ APIRoute.Comments }/${ hotelId }`, { comment, rating });
    return data;
  });

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  });

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return {
      id: data.id,
      email: data.email,
      token: data.token,
    };
  });

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    clearToken();
  });
