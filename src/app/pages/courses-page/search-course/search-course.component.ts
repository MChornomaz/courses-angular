import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { searchIconSvg } from 'src/app/constants';

import { FilterPipe } from '../../../pipes/FilterPipe/filter.pipe';
import { CoursesService } from '../../../services/courses/courses.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
  providers: [FilterPipe],
})
export class SearchCourseComponent {
  searchString = '';
  searchIcon: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private coursesService: CoursesService
  ) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  searchHandler() {
    this.coursesService.filterCourses(this.searchString);
  }

  handleInputChange() {
    if (this.searchString === '' || this.searchString.trim() === '') {
      this.coursesService.resetCourses();
    }
  }
}
