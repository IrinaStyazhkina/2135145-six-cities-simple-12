import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const/routes';
export const redirectToRoute = createAction<AppRoute>('app/redirect');

