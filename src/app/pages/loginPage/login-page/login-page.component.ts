import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logIn } from 'src/app/store/auth/auth.actions';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  login = '';
  password = '';
  isAuth$: Observable<boolean>;
  isAuthenticated = false;
  constructor(private store: Store, private router: Router) {
    this.isAuth$ = store.select(selectIsAuthenticated);
    this.isAuth$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        this.router.navigate(['courses']);
      }
    });
  }

  logIn() {
    if (this.login.trim().length > 0 && this.password.trim().length > 0) {
      this.store.dispatch(
        logIn({ login: this.login, password: this.password })
      );
    }
  }
}
