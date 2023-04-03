import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort';
import { changeCity, fillOffers, setSorting } from './action';

const initialState: {
  city: City;
  offers: Offer[];
  sortType: SortType;
} = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  offers: offers,
  sortType: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(setSorting, (state, action) => {
      state.sortType = action.payload.sortType;
    });
});

