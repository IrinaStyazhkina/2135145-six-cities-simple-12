import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const/auth-status';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Reviews } from "../types/review";
import { SortType } from '../types/sort';
import { UserData } from '../types/user-data';
import {
  changeCity,
  loadOffers,
  setAuthorizationStatus, setComments,
  setCurrentOffer,
  setDataLoading, setOffersNearBy,
  setSorting,
  setUserData
} from './action';

type initialData = {
  city: City;
  offers: Offer[];
  currentOffer: Offer | null;
  offersNearBy: Offer[];
  comments: Reviews;
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
  currentOffer: null,
  offersNearBy: [],
  comments: [],
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
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setOffersNearBy, (state, action) => {
      state.offersNearBy = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
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

