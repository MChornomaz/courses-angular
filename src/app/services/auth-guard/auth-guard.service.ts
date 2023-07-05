import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return from(this.authService.userIsAuthenticated()).pipe(
      map((authenticated) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
