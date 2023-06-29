import { Injectable } from '@angular/core';
import { Course } from '../../models/course.model';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  coursesChanged$ = new Subject<Course[]>();

  constructor(private http: HttpClient, private loadingService: LoadingService) {
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
    this.loadingService.showLoading();
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
    this.loadingService.hideLoading();
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

  filterCourses(searchString: string) {
    this.loadingService.showLoading();
    if (searchString.length >= 3) {
      return this.getCoursesBySearchString(searchString)
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((response: Course[]) => {
            this.courses = response;
            this.coursesChanged$.next(this.courses);
            this.loadingService.hideLoading();
            return of(response);
          })
        )
        .subscribe();
    } else {
      return this.fetchCourses()
        .pipe(
          debounceTime(500),
          switchMap((response: Course[]) => {
            this.courses = response;
            this.coursesChanged$.next(this.courses);
            this.loadingService.hideLoading();
            return of(response);
          })
        )
        .subscribe();
    }

  }

  private getCoursesBySearchString(searchString: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `http://localhost:3004/courses?textFragment=${searchString}`
    ).pipe(
      catchError((error) => {
        throw new Error(`An error occurred: ${error.message}`);
      })
    );
  }

  async removeCourse(id: number) {
    this.loadingService.showLoading();
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
        this.loadingService.hideLoading();
        this.coursesChanged$.next(this.courses);
      });
    }
  }

  async resetCourses() {
    this.loadingService.showLoading();
    this.fetchCourses();
    this.fetchCourses().subscribe((response) => {
      this.courses = response;
    });
    this.coursesChanged$.next(this.courses);
    this.loadingService.hideLoading();
  }
}
