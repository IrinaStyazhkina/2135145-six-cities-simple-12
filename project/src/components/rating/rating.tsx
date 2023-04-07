import { getHotelStarsWidth } from '../../utils/rating';

type RatingType = {
  rating: number;
}
function Rating({rating}: RatingType): JSX.Element {
  return (
    <div className="property__stars rating__stars">
      <span style={{ width: getHotelStarsWidth(rating)}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Rating;
