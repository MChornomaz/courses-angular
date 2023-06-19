import { Component, Input } from '@angular/core';
import { addCourseIconSVG } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  addCourseIcon = addCourseIconSVG;
  constructor(private router: Router) {}

  addCourseHandler() {
    this.router.navigate(['courses/new']);
  }
}
