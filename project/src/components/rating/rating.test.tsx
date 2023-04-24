import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render with 60% width for rating = 3', () => {
    const rating = 3;
    render(
      <Rating rating={rating}/>
    );
    expect(screen.getByTestId('rating').style.width).toEqual('60%');
  });

  it('should render with 100% width for rating = 5', () => {
    const rating = 5;
    render(
      <Rating rating={rating}/>
    );
    expect(screen.getByTestId('rating').style.width).toEqual('100%');
  });
});
