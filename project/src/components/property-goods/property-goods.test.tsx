import { render, screen } from '@testing-library/react';
import PropertyGoods from './property-goods';

describe('Component: PropertyGoods', () => {
  const goods = ['garden', 'mountain-view', 'breakfast'];
  it('should render correctly', () => {
    render(
      <PropertyGoods goods={goods}/>
    );
    const allGoodsElements = screen.getAllByTestId('property__inside-item');

    expect(screen.getByText(/What's inside/)).toBeInTheDocument();
    expect(allGoodsElements).toHaveLength(3);
    expect(allGoodsElements[0]).toHaveTextContent('garden');
    expect(allGoodsElements[1]).toHaveTextContent('mountain-view');
    expect(allGoodsElements[2]).toHaveTextContent('breakfast');
  });
});
