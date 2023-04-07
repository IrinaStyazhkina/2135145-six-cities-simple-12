import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const/auth-status';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort';
import { UserData } from '../types/user-data';
import { changeCity, loadOffers, setAuthorizationStatus, setDataLoading, setSorting, setUserData } from './action';

type initialData = {
  city: City;
  offers: Offer[];
  sortType: SortType;
  isDataLoading: boolean;
  authorizationStatus: AuthStatus;
  userData: UserData | null;
  error: string | null;
}

const initialState: initialData = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  offers: [],
  sortType: 'Popular',
  isDataLoading: false,
  authorizationStatus: AuthStatus.Unknown,
  userData: null,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(setDataLoading, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

