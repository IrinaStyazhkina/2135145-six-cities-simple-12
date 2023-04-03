import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const changeCity = createAction<{city: City}>('city/change');

export const fillOffers = createAction<{offers: Offer[]}>('offers/fill');
