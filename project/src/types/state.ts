import { AuthStatus } from "../const/auth-status";
import { store } from '../store/index';
import { City } from "./city";
import { Offer } from "./offer";
import { Reviews } from "./review";
import { SortType } from "./sort";
import { UserData } from "./user-data";

export type UserProcess = {
  authorizationStatus: AuthStatus;
  userData: UserData | null;
};

export type AppData = {
  offers: Offer[];
  currentOffer: Offer | null;
  offersNearBy: Offer[];
  comments: Reviews;
  isDataLoading: boolean;
};

export type AppProcess = {
  city: City,
  sortType: SortType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
