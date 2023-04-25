import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { AuthStatus } from '../../const/auth-status';
import { City } from '../../types/city';
import { makeFakeOffer } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import Cities from './cities';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    authorizationStatus: AuthStatus.Auth,
  },
  DATA: {
    isLoading: false,
  },
  APP: {
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    sortType: 'Popular',
  },
});

describe('Component: Cities', () => {
  it('should render correctly', () => {
    const city: City = {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    };
    const offers = new Array(4).fill(null).map(makeFakeOffer).map((offer) => {
      offer.city = city;
      return offer;
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cities
            selectedCity={city}
            offersForCity={offers}
            currentSortType={'Popular'}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Places/)).toBeInTheDocument();
    expect(screen.getByText(/4 places to stay in Amsterdam/)).toBeInTheDocument();
  });
});
