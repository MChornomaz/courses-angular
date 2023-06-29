import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { searchIconSvg } from 'src/app/constants';
import { Subject } from 'rxjs';
import { FilterPipe } from '../../../pipes/FilterPipe/filter.pipe';
import { CoursesService } from '../../../services/courses/courses.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
  providers: [FilterPipe],
})
export class SearchCourseComponent implements OnInit {
  searchString = '';
  searchIcon: SafeHtml;
  inputChangedSubject: Subject<string> = new Subject<string>();

  constructor(
    private sanitizer: DomSanitizer,
    private coursesService: CoursesService
  ) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  ngOnInit() {
    this.inputChangedSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchString: string) => {
        if (searchString.length >= 3) {
          this.coursesService.filterCourses(searchString);
        } else {
          this.coursesService.resetCourses();
        }
      });
  }

  handleInputChange() {
    this.inputChangedSubject.next(this.searchString);
  }
}
