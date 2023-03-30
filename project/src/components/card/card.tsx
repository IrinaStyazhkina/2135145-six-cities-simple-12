import { Link } from 'react-router-dom';
import { Offer, OfferType } from '../../types/offer';
import { getHotelStarsWidth } from '../../utils/rating';

type CardProps = {
  offer: Offer;
  classNamePrefix: 'cities' | 'near-places';
}

function getOfferTypeName(type: OfferType) {
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

function Card({offer, classNamePrefix}: CardProps): JSX.Element {
  return (
    <article className={`${classNamePrefix}__card place-card`}>
      {
        offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${classNamePrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&nbsp;&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getHotelStarsWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{getOfferTypeName(offer.type)}</p>
      </div>
    </article>
  );
}

export default Card;
