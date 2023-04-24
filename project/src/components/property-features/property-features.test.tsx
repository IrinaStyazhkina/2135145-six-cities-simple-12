import { render, screen } from '@testing-library/react';
import PropertyFeatures from './property-features';

describe('Component: PropertyFeatures', ()=> {
  it('should render correctly', () => {
    render(
      <PropertyFeatures type='apartment' bedrooms={3} maxAdults={6}/>
    );

    expect(screen.getByTestId('property-feature__type')).toHaveTextContent('Apartment');
    expect(screen.getByTestId('property-feature__bedrooms')).toHaveTextContent('3 Bedrooms');
    expect(screen.getByTestId('property-feature__max-adults')).toHaveTextContent('Max 6 adults');
  });
});
