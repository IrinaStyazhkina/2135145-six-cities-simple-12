import { render, screen } from '@testing-library/react';
import { City } from '../../types/city';
import { makeFakeOffer } from '../../utils/testData';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const city : City = {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    };

    const points = new Array(3).fill(null).map(makeFakeOffer).map((offer) => {
      offer.city = city;
      return offer;
    });

    render(
      <Map city={city} points={points} selectedPoint={points[0]}/>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
