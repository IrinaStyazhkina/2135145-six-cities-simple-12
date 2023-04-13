import { combineReducers } from "@reduxjs/toolkit";
import { Namespace } from "../const/namespace";
import { appData } from "./app-data/app-data";
import { appProcess } from "./app-process/app-process";
import { userProcess } from "./user-process/user-process";

export const rootReducer = combineReducers({
  [Namespace.App]: appProcess.reducer,
  [Namespace.Data]: appData.reducer,
  [Namespace.User]: userProcess.reducer,
});
