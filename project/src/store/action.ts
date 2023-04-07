import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../const/auth-status';
import { AppRoute } from '../const/routes';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort';
import { UserData } from '../types/user-data';

export const changeCity = createAction<{city: City}>('city/change');

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setSorting = createAction<{sortType: SortType}>('sorting/set');

export const setDataLoading = createAction<boolean>('data/setDataLoadingStatus');

export const setAuthorizationStatus = createAction<AuthStatus>('user/setAuthorizationStatus');

export const setUserData = createAction<UserData>('user/setData');

export const redirectToRoute = createAction<AppRoute>('app/redirect');

