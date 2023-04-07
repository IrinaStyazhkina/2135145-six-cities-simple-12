import { Link } from 'react-router-dom';
import { Offer} from '../../types/offer';
import { getOfferTypeName } from '../../utils/offer';
import Rating from '../rating/rating';

type CardProps = {
  offer: Offer;
  classNamePrefix: 'cities' | 'near-places';
  onHover: () => void;

  onUnhover: () => void;
}
function Card({offer, classNamePrefix, onHover, onUnhover}: CardProps): JSX.Element {
  return (
    <article className={`${classNamePrefix}__card place-card`} onMouseOver={onHover} onMouseLeave={onUnhover}>
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
          <Rating rating={offer.rating}/>
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
