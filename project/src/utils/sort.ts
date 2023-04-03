import { Offer } from '../types/offer';
import { SortType } from '../types/sort';

export function sortOffers(sortType: SortType, offers: Offer[]) {
  switch (sortType) {
    case 'Price: low to high':
      return [...offers].sort((offerA, offerB) => offerA.price - offerB.price);
    case 'Price: high to low':
      return [...offers].sort((offerA, offerB) => offerB.price - offerA.price);
    case 'Top rated first':
      return [...offers].sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
}
