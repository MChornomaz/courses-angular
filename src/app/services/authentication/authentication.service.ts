import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;
  userInfo: User = {
    id: '',
    firsName: '',
    LastName: '',
    email: '',
    token: '',
  };
  authenticationChanged = new Subject<boolean>();
  userChanged = new Subject<User>();

  login(email: string) {
    // test user was created as a temporal placeholder for future server data
    const testUser = {
      id: 'test-id',
      firsName: 'user',
      LastName: 'Test Last Name',
      email: email,
      token: 'some test token placeholder',
    };
    this.isAuthenticated = true;
    localStorage.setItem('userName', testUser.firsName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', testUser.token);
    this.userInfo = testUser;
    this.authenticationChanged.next(this.isAuthenticated);
    this.userChanged.next(this.userInfo);
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    this.authenticationChanged.next(this.isAuthenticated);
    this.userChanged.next(this.userInfo);
  }

  getUserInfo() {
    return this.userInfo;
  }

  checkAuth() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    if (userEmail && userName && token) {
      const user: User = {
        id: 'test-id',
        firsName: userName,
        LastName: 'Test Last Name',
        email: userEmail,
        token: token,
      };

      this.isAuthenticated = true;
      this.userInfo = user;
      this.authenticationChanged.next(this.isAuthenticated);
      this.userChanged.next(this.userInfo);
    }
  }
}
