import { render, screen } from '@testing-library/react';
import { getMonthAndYear } from '../../utils/date';
import { makeFakeComment } from '../../utils/testData';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const review = makeFakeComment();

    render(<ReviewItem review={review} testid={'1'}/>);

    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', review.user.avatarUrl);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByTestId('rating').style.width).toEqual(`${Math.round(review.rating / 5 * 100)}%`);
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(getMonthAndYear(review.date))).toBeInTheDocument();
  });
});
