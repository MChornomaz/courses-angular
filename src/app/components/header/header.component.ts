import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { deleteIcon, editIcon } from '../../constants';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userName = '';
  authSubscription: Subscription;
  userSubscription: Subscription;
  @Output() showLogin = new EventEmitter();

  constructor(private authService: AuthenticationService) {
    this.authSubscription = this.authService.authenticationChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      }
    );
    this.userSubscription = this.authService.userChanged.subscribe(
      (user: User) => {
        this.userName = user.firsName;
      }
    );
  }

  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

  showLoginPage() {
    this.showLogin.emit();
  }

  ngOnInit() {
    this.authService.checkAuth();
    this.isAuthenticated = this.authService.isAuthenticated;
    this.userName = this.authService.getUserInfo().firsName;
  }

  logOut() {
    this.authService.logOut();
    console.log('LogOut ', this.userName);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
