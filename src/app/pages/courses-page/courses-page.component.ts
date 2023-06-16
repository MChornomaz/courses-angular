import { Component, Input } from '@angular/core';
import { addCourseIconSVG } from 'src/app/constants';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  addCourseIcon = addCourseIconSVG;

  addCourseHandler() {
    console.log('Add course button pressed');
  }
}
