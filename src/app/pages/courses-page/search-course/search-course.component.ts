import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { searchIconSvg } from 'src/app/constants';
import { timer, of } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  filterCourses,
  getCourses,
} from 'src/app/store/courses/courses.actions';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
})
export class SearchCourseComponent {
  searchString = '';
  searchIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private store: Store) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  handleInputChange() {
    if (this.searchString.length >= 3) {
      timer(500)
        .pipe(
          debounceTime(500),
          switchMap(() => {
            return of(
              this.store.dispatch(
                filterCourses({ searchString: this.searchString })
              )
            );
          })
        )
        .subscribe();
    } else if (this.searchString.length === 0) {
      timer(500)
        .pipe(
          debounceTime(500),
          switchMap(() => {
            return of(this.store.dispatch(getCourses()));
          })
        )
        .subscribe();
    }
  }
}
