import { User } from './user';

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

type City = {
  location: Location;
  name: string;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
