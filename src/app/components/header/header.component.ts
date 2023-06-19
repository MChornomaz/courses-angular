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
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authSubscription = this.authService.authenticationChanged$.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      }
    );
    this.userSubscription = this.authService.userChanged$.subscribe(
      (user: User) => {
        this.userName = user.firsName;
      }
    );
  }

  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

  showLoginPage() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.authService.checkAuth();
    this.isAuthenticated = this.authService.isAuthenticated;
    this.userName = this.authService.getUserInfo().firsName;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
