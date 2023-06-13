import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { COURSE_LIST, searchIconSvg } from 'src/app/constants';
import { Course } from '../../../models/course.model';
import { FilterPipe } from '../../../pipes/FilterPipe/filter.pipe';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
  providers: [FilterPipe],
})
export class SearchCourseComponent {
  searchString = '';
  searchIcon: SafeHtml;
  @Output() filteredCourses: EventEmitter<Course[]> = new EventEmitter<
    Course[]
  >();
  courses: Course[] = [];

  constructor(private sanitizer: DomSanitizer, private filterPipe: FilterPipe) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  applyFilter() {
    this.courses = this.filterPipe.transform(
      COURSE_LIST,
      this.searchString,
      'title'
    );
    this.filteredCourses.emit(this.courses);
  }

  searchHandler() {
    this.filteredCourses.emit([]);
    this.applyFilter();
  }

  handleInputChange() {
    if (this.searchString === '' || this.searchString.trim() === '') {
      this.filteredCourses.emit([]);
      this.applyFilter();
    }
  }
}
