import React from 'react';
import { Offer } from '../../types/offer';
import Card from '../card/card';
import cn from 'classnames';

type PlacesListKindType = 'cities' | 'near';

function getComponentByPlacesListType(
  offer: Offer,
  onCardHover?: (offer: Offer) => void,
  onCardUnhover?: () => void,
  type?: PlacesListKindType,) {
  switch(type) {
    case 'cities':
      return <Card testid='card_type-cities' key={offer.id} offer={offer} classNamePrefix='cities' onHover={() => onCardHover?.(offer)} onUnhover={onCardUnhover}/>;
    case 'near':
      return <Card testid='card_type-near' key={offer.id} offer={offer} classNamePrefix='near-places'/>;
  }
}

type PlacesListProps = {
  offers: Offer[];
  type?: PlacesListKindType;
  onCardHover?: (offer: Offer) => void;
  onCardUnhover?: () => void;
}

function PlacesList({offers, type, onCardHover, onCardUnhover}: PlacesListProps): JSX.Element {

  return (
    <div data-testid={'places__list'} className = {cn('places__list',
      {'near-places__list ': type === 'near'},
      {'cities__places-list tabs__content' : type === 'cities'},)}
    >
      {offers.map((offer) => getComponentByPlacesListType(offer, onCardHover, onCardUnhover, type))}
    </div>
  );
}

export default React.memo(PlacesList);
