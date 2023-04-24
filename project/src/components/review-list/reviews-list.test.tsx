import { render, screen } from '@testing-library/react';
import { makeFakeComment} from '../../utils/testData';
import ReviewList from './review-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const reviews = new Array(2).fill(null).map(makeFakeComment);
    render(<ReviewList reviews={reviews}/>);

    expect(screen.getAllByTestId('review__item')).toHaveLength(2);
  });
});
