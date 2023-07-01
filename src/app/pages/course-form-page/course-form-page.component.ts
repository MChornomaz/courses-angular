import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import {
  createCourse,
  updateCourse,
} from 'src/app/store/courses/courses.actions';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss'],
})
export class CourseFormPageComponent implements OnInit {
  courses: Course[] = [];
  coursesSub: Observable<Course[]>;
  title = '';
  description = '';
  date = '';
  duration = 0;
  editPage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.coursesSub = store.select(selectCourses);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.editPage = id ? true : false;
    this.coursesSub.subscribe((coursesData) => {
      this.courses = coursesData;
    });

    if (id) {
      const courseToEdit = this.getCourseById(parseInt(id, 10));
      if (courseToEdit) {
        this.title = courseToEdit.name;
        this.description = courseToEdit.description;
        const courseDate = new Date(courseToEdit.date);
        this.date = courseDate.toDateString();
        this.duration = courseToEdit.length;
      }
    }
  }

  getCourseById(id: number) {
    const result = this.courses.find((el) => el.id == id);
    if (!result) {
      throw new Error('Course was not found, please check the Id');
    }
    return result;
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
      this.store.dispatch(updateCourse({ id, newCourse }));
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
      this.store.dispatch(createCourse({ newCourse }));
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
