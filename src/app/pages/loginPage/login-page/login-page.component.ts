import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = '';
  password = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    if (this.email.trim().length > 0 && this.password.trim().length > 0) {
      this.authenticationService.login(this.email);
      this.router.navigate(['courses']);
    }
  }
}
