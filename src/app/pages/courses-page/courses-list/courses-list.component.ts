import { Component, OnInit } from '@angular/core';
import { COURSE_LIST } from 'src/app/constants';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = COURSE_LIST;
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
