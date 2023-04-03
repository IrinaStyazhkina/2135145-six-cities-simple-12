import { CityNameType } from '../types/city';
import { Offer } from '../types/offer';

export function getOffersByCity(city: CityNameType, offers: Offer[]){
  return offers.filter((offer) => offer.city.name === city);
}
