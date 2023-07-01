import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';

@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective implements OnInit {
  isAuthenticated = false;
  isAuth$: Observable<boolean>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {
    this.isAuth$ = store.select(selectIsAuthenticated);
    this.isAuth$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnInit() {
    this.isAuth$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.updateView();
    });
  }

  private updateView(): void {
    if (this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
