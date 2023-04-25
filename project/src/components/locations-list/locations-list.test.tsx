import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { City } from '../../types/city';
import { getRandomLocation } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import LocationsList from './locations-list';

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const handleSelectCity = jest.fn();
    const city: City = {
      name: 'Paris',
      location: getRandomLocation(),
    };

    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LocationsList selectedCity={city} handleSelectCity={handleSelectCity}/>
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('locations__item')).toHaveLength(6);
  });

  it('should fire selectCity event while clicking on location item', async () => {
    const handleSelectCity = jest.fn();
    const city: City = {
      name: 'Paris',
      location: getRandomLocation(),
    };

    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LocationsList selectedCity={city} handleSelectCity={handleSelectCity}/>
      </HistoryRouter>
    );

    await fireEvent.click(screen.getAllByTestId('locations__item')[1]);
    expect(handleSelectCity).toBeCalledTimes(1);
  });
});
