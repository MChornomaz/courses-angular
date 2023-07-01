import { createReducer, on } from '@ngrx/store';
import { authUser, logOut, setUser } from './auth.actions';

export interface AuthState {
  user: {
    id: string;
    name: {
      first: string;
      last: string;
    };
    login: string;
    token: string;
  };
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: {
    id: '',
    name: {
      first: '',
      last: '',
    },
    login: '',
    token: '',
  },
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(authUser, (state, action): AuthState => {
    return {
      ...state,
      isAuthenticated: action.isAuth,
    };
  }),
  on(setUser, (state, action): AuthState => {
    return {
      ...state,
      user: { ...action.user },
    };
  }),
  on(
    logOut,
    (): AuthState => ({
      user: {
        id: '',
        name: {
          first: '',
          last: '',
        },
        login: '',
        token: '',
      },
      isAuthenticated: false,
    })
  )
);
