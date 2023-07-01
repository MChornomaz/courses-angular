import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const initUser = createAction('[Auth] Init');

export const authUser = createAction(
  '[Auth] authUser',
  props<{ isAuth: boolean }>()
);

export const setUser = createAction(
  '[Auth] setUserData',
  props<{ user: User }>()
);

export const logOut = createAction('[Auth] logOut');

export const logIn = createAction(
  '[Auth] login',
  props<{ login: string; password: string }>()
);
