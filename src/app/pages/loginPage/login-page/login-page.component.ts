import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = '';
  password = '';
  @Output() hideLogin = new EventEmitter();
  constructor(private authenticationService: AuthenticationService) {}

  login() {
    if (this.email.trim().length > 0 && this.password.trim().length > 0) {
      this.authenticationService.login(this.email);
      this.hideLogin.emit();
      console.log('Logged in successfully');
    }
  }
}
