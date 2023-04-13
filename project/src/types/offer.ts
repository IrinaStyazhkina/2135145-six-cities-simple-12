import { City } from './city';
import { Reviews } from './review';
import { User } from './user';
import { Location } from './location';

export type Offer = {
  id: number;
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: OfferType;
}

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type OfferData = {
  currentOffer: Offer,
  offersNearBy: Offer[],
  comments: Reviews,
}
