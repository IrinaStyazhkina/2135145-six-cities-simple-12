import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Namespace } from '../../const/namespace';
import { City } from '../../types/city';
import { SortType } from '../../types/sort';
import { AppProcess } from '../../types/state';


const initialState: AppProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  sortType: 'Popular',
}
export const appProcess = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.city = city;
    },
    setSorting: (state, action:PayloadAction<{sortType: SortType}>) => {
      const {sortType} = action.payload;
      state.sortType = sortType;
    }
  },
});

export const {changeCity, setSorting} = appProcess.actions;
