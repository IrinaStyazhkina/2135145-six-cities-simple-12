import React from 'react';
import { Offer } from '../../types/offer';
import Host from '../host/host';
import PropertyFeatures from '../property-features/property-features';
import PropertyGoods from '../property-goods/property-goods';
import Rating from '../rating/rating';

type PropertyCardProps = {
  currentOffer: Offer;
}
function PropertyCard({currentOffer}: PropertyCardProps): JSX.Element{
  return(
    <>
      {currentOffer.isPremium && (
        <div className="property__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {currentOffer.title}
        </h1>
      </div>
      <div className="property__rating rating">
        <Rating rating={currentOffer.rating}/>
        <span className="property__rating-value rating__value">{currentOffer.rating}</span>
      </div>
      <PropertyFeatures type={currentOffer.type} bedrooms={currentOffer.bedrooms} maxAdults={currentOffer.maxAdults}/>
      <div className="property__price">
        <b className="property__price-value">&euro;{currentOffer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <PropertyGoods goods={currentOffer.goods}/>
      <Host host={currentOffer.host} description={currentOffer.description}/>
    </>
  );
}

export default React.memo(PropertyCard);
