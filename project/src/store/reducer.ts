import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { changeCity, fillOffers } from './action';

const initialState: {
  city: City;
  offers: Offer[];
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
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});

