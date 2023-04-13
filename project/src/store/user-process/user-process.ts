import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from "../../const/auth-status";
import { Namespace } from "../../const/namespace";
import { UserProcess } from "../../types/state";
import { checkAuthAction, loginAction, logoutAction } from "../api-actions";

const initialState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
  userData: null,
}
export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder ) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.userData = null;
      })
  }
});
