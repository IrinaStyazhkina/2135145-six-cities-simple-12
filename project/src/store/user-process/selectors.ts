import { AuthStatus } from "../../const/auth-status";
import { Namespace } from "../../const/namespace";
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getUserData = (state: State): UserData | null => state[Namespace.User].userData;
export const getAuthorizationStatus = (state: State): AuthStatus => state[Namespace.User].authorizationStatus;
