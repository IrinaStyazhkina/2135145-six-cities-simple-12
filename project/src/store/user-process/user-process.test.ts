import { AuthStatus } from '../../const/auth-status';
import { UserProcess } from '../../types/state';
import { makeFakeUserData } from '../../utils/testData';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

const initialState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
  userData: null,
};
describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  describe('logoutAction test', () => {
    const state = {authorizationStatus: AuthStatus.Auth, userData: makeFakeUserData()};

    it('should update authorizationStatus to No_Auth and drop user data if logout action is fullfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({
          authorizationStatus: AuthStatus.NoAuth,
          userData: null}
        );
    });
  });

  describe('loginAction test', () => {
    const fakeUserData = makeFakeUserData();
    it('should update authorizationStatus to Auth and set user data if login action is fullfilled', () => {
      expect(userProcess.reducer(initialState, {type: loginAction.fulfilled.type, payload: fakeUserData}))
        .toEqual(
          {
            authorizationStatus: AuthStatus.Auth,
            userData: fakeUserData}
        );
    });

    it('should update authorizationStatus to No_Auth if login action is rejected', () => {
      expect(userProcess.reducer(initialState, {type: loginAction.rejected.type}))
        .toEqual(
          {
            authorizationStatus: AuthStatus.NoAuth,
            userData: null}
        );
    });
  });

  describe('checkAuthAction test', () => {
    const fakeUserData = makeFakeUserData();

    it('should update authorizationStatus to Auth and set user data if checkAuth action is fullfilled', () => {
      expect(userProcess.reducer(initialState, {type: checkAuthAction.fulfilled.type, payload: fakeUserData}))
        .toEqual({
          authorizationStatus: AuthStatus.Auth,
          userData: fakeUserData
        });
    });

    it('should update authorisationStatus to NoAuth if checkAuth action is rejected', () => {
      expect(userProcess.reducer(initialState, {type: checkAuthAction.rejected.type}))
        .toEqual(
          {
            authorizationStatus: AuthStatus.NoAuth,
            userData: null
          });
    });
  });
});
