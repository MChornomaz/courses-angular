import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  filterCourses,
  getCourses,
} from 'src/app/store/courses/courses.actions';
import { searchIconSvg } from 'src/app/constants';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
})
export class SearchCourseComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  searchIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private store: Store) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((searchString: string) => {
          if (searchString.length >= 3) {
            return of(this.store.dispatch(filterCourses({ searchString })));
          } else if (searchString.length === 0) {
            return of(this.store.dispatch(getCourses()));
          } else {
            return of(null);
          }
        })
      )
      .subscribe();
  }
}
