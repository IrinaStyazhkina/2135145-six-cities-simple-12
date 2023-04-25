import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthStatus } from '../../const/auth-status';
import { makeFakeUserData } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly for authorized user', () => {
    const userData = makeFakeUserData();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData,
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


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(userData.email)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/)).not.toBeInTheDocument();
  });

  it('should render correctly for unauthorized user', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
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


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });
});
