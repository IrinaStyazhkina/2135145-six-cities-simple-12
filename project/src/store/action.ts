import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort';

export const changeCity = createAction<{city: City}>('city/change');

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setSorting = createAction<{sortType: SortType}>('sorting/set');

export const setDataLoading = createAction<boolean>('data/setDataLoadingStatus');


