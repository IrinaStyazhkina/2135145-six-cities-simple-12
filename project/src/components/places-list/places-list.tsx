import { Offer } from '../../types/offer';
import Card from '../card/card';
import cn from 'classnames';

type PlacesListKindType = 'cities' | 'near';

type PlacesListProps = {
  offers: Offer[];
  type?: PlacesListKindType;
}

function getComponentByPlacesListType(offer: Offer, type?: PlacesListKindType) {
  switch(type) {
    case 'cities':
      return <Card key={offer.id} offer={offer} classNamePrefix='cities'/>;
    case 'near':
      return <Card key={offer.id} offer={offer} classNamePrefix='near-places'/>;
  }
}
function PlacesList({offers, type}: PlacesListProps): JSX.Element {

  // const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className = {cn('places__list',
      {'near-places__list ': type === 'near'},
      {'cities__places-list tabs__content' : type === 'cities'},)}
    >
      {offers.map((offer) => getComponentByPlacesListType(offer, type))}
    </div>
  );
}

export default PlacesList;
