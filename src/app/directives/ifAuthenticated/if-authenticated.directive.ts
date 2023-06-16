import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective implements OnInit {
  subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) {
    this.subscription = this.authService.authenticationChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      }
    );
  }

  ngOnInit() {
    this.subscription = this.authService.authenticationChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
        this.updateView();
      }
    );

    this.updateView();
  }

  private updateView(): void {
    if (this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
