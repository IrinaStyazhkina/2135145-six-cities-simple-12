import React from 'react';
import { Reviews } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Reviews;
}
function ReviewList({reviews} : ReviewListProps): JSX.Element{
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem key={review.id} review={review} testid='review__item'/>)}
    </ul>
  );
}

export default React.memo(ReviewList);
