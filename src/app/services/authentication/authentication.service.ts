import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;
  userInfo: User = {
    id: '',
    name: {
      first: '',
      last: '',
    },
    login: '',
    token: '',
  };
  authenticationChanged$ = new Subject<boolean>();
  userChanged$ = new Subject<User>();

  constructor(private http: HttpClient) {}

  userIsAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isAuthenticated);
      }, 300);
    });
    return promise;
  }

  getToken(login: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:3004/auth/login',
      {
        login,
        password,
      }
    );
  }

  async login(login: string, password: string) {
    try {
      const tokenResponse = await this.getToken(login, password)
        .pipe(
          catchError((error) => {
            throw new Error(`An error occurred: ${error.message}`);
          })
        )
        .toPromise();

      if (tokenResponse) {
        const token = tokenResponse.token;

        const userData = await this.getUserInfo(token)
          .pipe(
            catchError((error) => {
              throw new Error(`An error occurred: ${error.message}`);
            })
          )
          .toPromise();
        console.log(userData);

        if (userData) {
          const testUser: User = {
            id: userData.id,
            name: {
              first: userData.name.first,
              last: userData.name.last,
            },
            login,
            token,
          };
          console.log(testUser);
          this.isAuthenticated = true;
          localStorage.setItem('userName', testUser.name.first);
          localStorage.setItem('userLogin', login);
          localStorage.setItem('token', testUser.token);
          this.userInfo = testUser;
          this.authenticationChanged$.next(this.isAuthenticated);
          this.userChanged$.next(this.userInfo);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('userName');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('token');
    this.authenticationChanged$.next(this.isAuthenticated);
    this.userChanged$.next(this.userInfo);
  }

  getUserInfo(token: string) {
    return this.http.post<User>('http://localhost:3004/auth/userinfo', {
      token,
    });
  }

  checkAuth() {
    const userName = localStorage.getItem('userName');
    const userLogin = localStorage.getItem('userLogin');
    const token = localStorage.getItem('token');

    if (userLogin && userName && token) {
      const user: User = {
        id: 'test-id',
        name: {
          first: userName,
          last: 'Test Last Name',
        },
        login: userLogin,
        token: token,
      };

      this.isAuthenticated = true;
      this.userInfo = user;
      this.authenticationChanged$.next(this.isAuthenticated);
      this.userChanged$.next(this.userInfo);
    }
  }
}
