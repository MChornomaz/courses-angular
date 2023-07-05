import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { logIn } from 'src/app/store/auth/auth.actions';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginControl: FormControl;
  passwordControl: FormControl;
  isAuth$: Observable<boolean>;
  isAuthenticated = false;

  constructor(private store: Store, private router: Router) {
    this.loginControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);

    this.isAuth$ = store.select(selectIsAuthenticated);
    this.isAuth$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        this.router.navigate(['courses']);
      }
    });
  }

  logIn() {
    if (this.loginControl.valid && this.passwordControl.valid) {
      this.store.dispatch(
        logIn({
          login: this.loginControl.value,
          password: this.passwordControl.value,
        })
      );
    }
  }
}
