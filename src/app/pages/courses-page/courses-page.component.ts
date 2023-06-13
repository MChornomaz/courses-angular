import { Component, Input } from '@angular/core';
import { addCourseIconSVG } from 'src/app/constants';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  addCourseIcon = addCourseIconSVG;
  @Input() filteredCourses: Course[] = [];

  addCourseHandler() {
    console.log('Add course button pressed');
    console.log(this.filteredCourses, 'page');
  }
}
