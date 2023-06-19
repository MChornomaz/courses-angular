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
      const courseToEdit = this.coursesService.getCourseById(id);
      if (courseToEdit) {
        this.title = courseToEdit.title;
        this.description = courseToEdit.description;
        this.date = courseToEdit.creationDate.toDateString();
        this.duration = courseToEdit.duration;
      }
    }
  }

  saveHandler() {
    if (this.editPage) {
      const id = this.route.snapshot.params['id'];
      const newCourse: Course = {
        id: id,
        title: this.title,
        duration: this.duration,
        creationDate: new Date(this.date),
        description: this.description,
      };
      this.coursesService.updateCourse(id, newCourse);
    } else {
      const newCourse: Course = {
        id: new Date().getMilliseconds().toString(),
        title: this.title,
        duration: this.duration,
        creationDate: new Date(this.date),
        description: this.description,
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
