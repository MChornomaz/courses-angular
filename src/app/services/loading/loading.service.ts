import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();

  showLoading() {
    this.loadingSubject.next(true);
    console.log('spin');
  }

  hideLoading() {
    this.loadingSubject.next(false);
    console.log('end');
  }
}
