import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthStatus } from '../../const/auth-status';
import SendCommentForm from './send-comment-form';

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
describe('Component: SendCommentForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <SendCommentForm/>
      </Provider>
    );

    expect(screen.getByText(/Your review/)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });
});
