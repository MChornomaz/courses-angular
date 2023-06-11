import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { COURSE_LIST } from '../../../constants';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input() initialCourses: Course[] = [];
  courses: Course[] = [];

  ngOnInit() {
    this.initialCourses = COURSE_LIST;
    this.courses = this.initialCourses;
  }

  ngOnChanges() {
    this.courses = this.initialCourses;
  }

  loadMoreClickHandler() {
    console.log('Load more button pressed!');
  }

  deleteCourseHandler(id: string) {
    console.log('Course to delete has id: ', id);
  }

  trackByFn(index: number, course: Course): string {
    return course.id;
  }
}
