// import { useState } from 'react';
import { Offer } from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
  offers: Offer[];
}
function OfferList({offers}: OfferListProps): JSX.Element {

  // const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default OfferList;
