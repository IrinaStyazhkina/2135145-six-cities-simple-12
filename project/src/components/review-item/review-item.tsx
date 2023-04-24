import { Review } from '../../types/review';
import { getMonthAndYear } from '../../utils/date';
import { getHotelStarsWidth } from '../../utils/rating';

type ReviewProps = {
  review: Review;
  testid: string;
}

function ReviewItem({review, testid} : ReviewProps) : JSX.Element{
  return (
    <li className="reviews__item" data-testid={testid}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span data-testid='rating' style={{ width: getHotelStarsWidth(review.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{getMonthAndYear(review.date)}</time>
      </div>
    </li>);
}

export default ReviewItem;
