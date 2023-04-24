import { render, screen } from '@testing-library/react';
import { City } from '../../types/city';
import EmptyState from './empty-state';

describe('Component: EmptyState', () => {
  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  };

  it('should render correctly', () => {
    render(
      <EmptyState city={city}/>
    );
    expect(screen.getByText(/No places to stay available/)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/)).toBeInTheDocument();
  });
});
