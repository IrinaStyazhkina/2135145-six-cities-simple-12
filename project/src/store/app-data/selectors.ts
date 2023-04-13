import { Namespace } from '../../const/namespace';
import { Offer } from '../../types/offer';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[Namespace.Data].offers;
export const getCurrentOffer = (state: State): Offer | null => state[Namespace.Data].currentOffer;
export const getOffersNearBy = (state: State): Offer[] => state[Namespace.Data].offersNearBy;
export const getComments = (state: State): Reviews => state[Namespace.Data].comments;
export const getDataLoadingStatus = (state: State): boolean => state[Namespace.Data].isDataLoading;
