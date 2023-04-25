import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const/routes';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('/login');
  });

  it('should redirect lo main page', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
    ]);
  });
});
