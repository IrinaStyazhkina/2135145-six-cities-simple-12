import { CityNameType } from '../types/city';
import { Offer, OfferType } from '../types/offer';

export function getOffersByCity(city: CityNameType, offers: Offer[]){
  return offers.filter((offer) => offer.city.name === city);
}

export function getOfferTypeName(type: OfferType) {
  switch(type) {
    case 'apartment':
      return 'Apartment';
    case 'hotel':
      return 'Hotel';
    case 'house':
      return 'House';
    case 'room':
      return 'Private room';
  }
}
