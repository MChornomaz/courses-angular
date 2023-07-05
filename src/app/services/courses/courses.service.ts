import { Injectable } from '@angular/core';
import { Course } from '../../models/course.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  coursesChanged$ = new Subject<Course[]>();

  constructor(private http: HttpClient) {
    this.fetchCourses();
    this.fetchCourses().subscribe((response) => {
      this.courses = response;
    });
  }

  getList() {
    return [...this.courses];
  }

  fetchCourses(start = 0, count = 5) {
    return this.http.get<Course[]>(
      `http://localhost:3004/courses?start=${start}&count=${count}`
    );
  }

  async createCourse(course: Course) {
    const response = await this.http
      .post<Course>(`http://localhost:3004/courses/`, course)
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      )
      .toPromise();

    if (response) {
      this.fetchCourses().subscribe((response) => {
        this.courses = response;
        this.coursesChanged$.next(this.courses);
      });
    }
  }

  getCourseById(id: number) {
    const result = this.courses.find((el) => el.id == id);
    if (!result) {
      throw new Error('Course was not found, please check the Id');
    }
    return result;
  }

  updateCourse(id: number, course: Course) {
    const index = this.courses.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.courses[index] = { ...course };
      this.coursesChanged$.next(this.getList());
    }
  }

  async filterCourses(searchString: string) {
    const response = await this.http
      .get<Course[]>(
        `http://localhost:3004/courses?textFragment=${searchString}`
      )
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      )
      .toPromise();

    if (response) {
      this.courses = response;
      this.coursesChanged$.next(this.courses);
    }
  }

  async removeCourse(id: number) {
    const response = await this.http
      .delete<Course[]>(`http://localhost:3004/courses/${id}`)
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      )
      .toPromise();

    if (response) {
      this.fetchCourses().subscribe((response) => {
        this.courses = response;
        this.coursesChanged$.next(this.courses);
      });
    }
  }

  async resetCourses() {
    this.fetchCourses();
    this.fetchCourses().subscribe((response) => {
      this.courses = response;
    });
    this.coursesChanged$.next(this.courses);
  }
}
