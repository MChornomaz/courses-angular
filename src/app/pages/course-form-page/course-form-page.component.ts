import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss'],
})
export class CourseFormPageComponent implements OnInit {
  title = '';
  description = '';
  date = '';
  duration = 0;
  editPage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.editPage = id ? true : false;

    if (id) {
      const courseToEdit = this.coursesService.getCourseById(parseInt(id, 10));
      if (courseToEdit) {
        this.title = courseToEdit.name;
        this.description = courseToEdit.description;
        const courseDate = new Date(courseToEdit.date);
        this.date = courseDate.toDateString();
        this.duration = courseToEdit.length;
      }
    }
  }

  saveHandler() {
    if (this.editPage) {
      const id = this.route.snapshot.params['id'];
      const newCourse: Course = {
        id: id,
        name: this.title,
        length: this.duration,
        date: new Date(this.date),
        description: this.description,
        isTopRated: false,
      };
      this.coursesService.updateCourse(id, newCourse);
    } else {
      const newCourse: Course = {
        id: new Date().getMilliseconds(),
        name: this.title,
        length: this.duration,
        date: new Date(this.date),
        description: this.description,
        isTopRated: false,
        authors: [{ id: 'test-id', name: 'Max' }],
      };
      this.coursesService.createCourse(newCourse);
    }
    this.router.navigate(['courses']);
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDateChange(date: string) {
    this.date = date;
  }
  onDurationChange(duration: number) {
    this.duration = duration;
  }
}
