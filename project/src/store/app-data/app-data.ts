import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../const/namespace';
import { AppData } from '../../types/state';
import { fetchOfferData, fetchOffersAction, sendNewComment } from '../api-actions';

const initialState: AppData = {
  offers: [],
  currentOffer: null,
  offersNearBy: [],
  comments: [],
  isDataLoading: false,
};
export const appData = createSlice({
  name: Namespace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOfferData.fulfilled, (state, action) => {
        const offerData = action.payload;
        if(offerData) {
          state.currentOffer = offerData.currentOffer;
          state.offersNearBy = offerData.offersNearBy;
          state.comments = offerData.comments;
        }
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
