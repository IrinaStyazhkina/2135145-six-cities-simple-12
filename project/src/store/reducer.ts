import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort';
import { changeCity, loadOffers, setDataLoading, setSorting } from './action';

const initialState: {
  city: City;
  offers: Offer[];
  sortType: SortType;
  isDataLoading: boolean;
} = {
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
    });
});

