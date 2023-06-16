import { Injectable } from '@angular/core';
import { Course } from '../../models/course.model';
import { COURSE_LIST } from '../../constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = COURSE_LIST;
  coursesChanged = new Subject<Course[]>();

  getList() {
    return this.courses.slice();
  }

  createCourse(course: Course) {
    this.courses.push(course);
    this.coursesChanged.next(this.courses.slice());
  }

  getCourseById(id: string) {
    const result = this.courses.find((el) => el.id === id);
    if (result) {
      return result;
    } else {
      throw new Error('Course was not found, please check the Id');
    }
  }

  updateCourse(id: string, course: Course) {
    const index = this.courses.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.courses[index] = course;
      this.coursesChanged.next(this.courses.slice());
    }
  }

  removeCourse(id: string) {
    this.courses = this.courses.filter((el) => el.id !== id);
    this.coursesChanged.next(this.courses.slice());
  }

  filterCourses(searchString: string) {
    this.courses = this.courses.filter((el) =>
      el.title.trim().toLowerCase().includes(searchString.trim().toLowerCase())
    );
    this.coursesChanged.next(this.courses.slice());
  }

  resetCourses() {
    this.courses = COURSE_LIST;
    this.coursesChanged.next(this.courses.slice());
  }
}
