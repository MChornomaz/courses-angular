import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectIsAuthenticated).pipe(
      first(),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}
