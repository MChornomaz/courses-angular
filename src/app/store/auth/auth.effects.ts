import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authUser, initUser, logIn, logOut, setUser } from './auth.actions';
import { switchMap, catchError, map, tap, concatMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { of } from 'rxjs';
import { API_HOST } from 'src/app/constants';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getToken(login: string, password: string) {
    return this.http.post<{ token: string }>(`${API_HOST}auth/login`, {
      login,
      password,
    });
  }

  getUserInfo(token: string) {
    return this.http.post<User>(`${API_HOST}auth/userinfo`, {
      token,
    });
  }

  checkToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(initUser),
      map(() => {
        const token = localStorage.getItem('token');
        const isAuthenticated = !!token;

        return authUser({ isAuth: isAuthenticated });
      })
    );
  });

  setUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initUser),
      concatMap(() => {
        const token = localStorage.getItem('token');
        if (token) {
          return this.getUserInfo(token).pipe(
            map((userData) => {
              const testUser: User = {
                id: userData.id,
                name: {
                  first: userData.name.first,
                  last: userData.name.last,
                },
                login: userData.login,
                token,
              };
              return setUser({ user: testUser });
            }),
            catchError((error) => {
              console.error(`An error occurred: ${error.message}`);
              return [];
            })
          );
        } else {
          return [];
        }
      })
    );
  });

  loginUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(logIn),
      switchMap((action) => {
        const { login, password } = action;
        return this.getToken(login, password).pipe(
          switchMap((tokenResponse) => {
            const token = tokenResponse.token;
            return this.getUserInfo(token).pipe(
              concatMap((userData) => {
                const testUser: User = {
                  id: userData.id,
                  name: {
                    first: userData.name.first,
                    last: userData.name.last,
                  },
                  login,
                  token,
                };
                localStorage.setItem('userName', testUser.name.first);
                localStorage.setItem('userLogin', login);
                localStorage.setItem('token', testUser.token);
                const setUserAction = setUser({ user: testUser });
                const authUserAction = authUser({ isAuth: true });
                return of(setUserAction, authUserAction);
              }),
              catchError((error) => {
                console.error(`An error occurred: ${error.message}`);
                return [];
              })
            );
          })
        );
      })
    );
  });

  logOutUser = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logOut),
        switchMap(() => {
          localStorage.removeItem('userName');
          localStorage.removeItem('userLogin');
          localStorage.removeItem('token');
          return of(logOut());
        })
      );
    },
    { dispatch: false }
  );
}
