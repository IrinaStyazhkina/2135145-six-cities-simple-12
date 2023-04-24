import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { AuthStatus } from '../../const/auth-status';
import { AppRoute } from '../../const/routes';
import { makeFakeOffer } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import App from './app';

const mockStore = configureMockStore();

const fakeOffers = new Array(5).fill(null).map(makeFakeOffer).map((offer, index) => {
  offer.id = index + 1;
  return offer;
});

const store = mockStore({
  USER: {
    authorizationStatus: AuthStatus.Auth,
  },
  DATA: {
    offers: fakeOffers,
    isLoading: false,
    currentOffer: fakeOffers[0],
    offersNearBy: [fakeOffers[1], fakeOffers[2], fakeOffers[3]],
    comments: [],
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render MainPage when user navigate to /', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('5 places to stay in Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('should render Room screen when user navigates to /offer/:id', () => {
    history.push('/offer/1');
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => () => null);

    render(fakeApp);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
  });

  it('should render NotFoundPage while user navigates to not existing route', () => {
    history.push('/fake-page');
    render(fakeApp);

    expect(screen.getByText(/404 Not Found. Go to/)).toBeInTheDocument();
    expect(screen.getByText(/main page/)).toBeInTheDocument();
  });

  it('should render Login page when user navigates to /login', () => {
    history.push(AppRoute.Login);

    render(fakeApp);
    expect(screen.getAllByText(/Sign in/)).toHaveLength(2);
    expect(screen.getByTestId('email__input')).toHaveAttribute('placeholder', 'Email');
    expect(screen.getByTestId('password__input')).toHaveAttribute('placeholder', 'Password');
  });
});

