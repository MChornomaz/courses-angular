import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteIcon, editIcon } from '../../constants';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsAuthenticated,
  selectUser,
} from 'src/app/store/auth/auth.selectors';
import { initUser, logOut } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  isAuth = false;
  userName = '';
  user$: Observable<User>;

  constructor(private router: Router, private store: Store) {
    this.isAuthenticated$ = store.select(selectIsAuthenticated);
    this.user$ = store.select(selectUser);
  }

  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

  showLoginPage() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.store.dispatch(initUser());
    this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuth = isAuthenticated;
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.user$.subscribe((userData: User) => {
        this.userName = userData.name.first;
      });
      this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        this.isAuth = isAuthenticated;
      });
    }
  }

  logOut() {
    this.router.navigate(['login']);
    this.store.dispatch(logOut());
  }
}
