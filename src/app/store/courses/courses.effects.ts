import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import {
  setCourses,
  getCourses,
  deleteCourse,
  loadMoreCourses,
  addMoreCourses,
  filterCourses,
  createCourse,
  updateCourse, // Import the loadMoreCourses action
} from './courses.actions';
import { catchError, map, switchMap, of, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  fetchCourses(start = 0, count = 5) {
    return this.http.get<Course[]>(
      `http://localhost:3004/courses?start=${start}&count=${count}`
    );
  }

  removeCourse(id: number) {
    return this.http
      .delete<Course[]>(`http://localhost:3004/courses/${id}`)
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      );
  }

  getCoursesBySearchString(searchString: string): Observable<Course[]> {
    return this.http
      .get<Course[]>(
        `http://localhost:3004/courses?textFragment=${searchString}`
      )
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      );
  }

  createCourse(course: Course) {
    return this.http
      .post<Course>(`http://localhost:3004/courses/`, course)
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      );
  }

  updateCourse(id: string, newCourse: Course) {
    return this.http
      .patch(`http://localhost:3004/courses/${id}`, newCourse)
      .pipe(
        catchError((error) => {
          throw new Error(`An error occurred: ${error.message}`);
        })
      );
  }

  getCoursesData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCourses),
      switchMap(() => {
        this.loadingService.showLoading();
        return this.fetchCourses().pipe(
          map((coursesData) => {
            this.loadingService.hideLoading();
            return setCourses({ courses: coursesData });
          }),
          catchError((error) => {
            console.error(error.message);
            this.loadingService.hideLoading();
            return [];
          })
        );
      })
    );
  });

  loadMoreCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMoreCourses),
      switchMap((action) => {
        const { start, count } = action;
        this.loadingService.showLoading();
        return this.fetchCourses(start, count).pipe(
          map((coursesData) => {
            this.loadingService.hideLoading();
            return addMoreCourses({ courses: coursesData });
          }),
          catchError((error) => {
            console.error(error.message);
            this.loadingService.hideLoading();
            return [];
          })
        );
      })
    );
  });

  removeCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCourse),
      switchMap((action) => {
        this.loadingService.showLoading();
        const { id } = action;
        return this.removeCourse(parseInt(id, 10)).pipe(
          switchMap((courseData) => {
            if (courseData) {
              return this.fetchCourses().pipe(
                map((coursesData) => {
                  this.loadingService.hideLoading();
                  return setCourses({ courses: coursesData });
                }),
                catchError((error) => {
                  console.error(error.message);
                  this.loadingService.hideLoading();
                  return [];
                })
              );
            } else {
              this.loadingService.hideLoading();
              return [];
            }
          })
        );
      })
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourse),
      switchMap((action) => {
        this.loadingService.showLoading();
        const { newCourse } = action;
        return this.createCourse(newCourse).pipe(
          switchMap((courseData) => {
            if (courseData) {
              return this.fetchCourses().pipe(
                map(() => {
                  console.log('create courses');
                  this.loadingService.hideLoading();
                  return getCourses();
                }),
                catchError((error) => {
                  console.error(error.message);
                  this.loadingService.hideLoading();
                  return [];
                })
              );
            } else {
              this.loadingService.hideLoading();
              return [];
            }
          })
        );
      })
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourse),
      switchMap((action) => {
        this.loadingService.showLoading();
        const { id, newCourse } = action;
        return this.updateCourse(id, newCourse).pipe(
          switchMap((courseData) => {
            if (courseData) {
              return this.fetchCourses().pipe(
                map(() => {
                  this.loadingService.hideLoading();
                  return getCourses();
                }),
                catchError((error) => {
                  console.error(error.message);
                  this.loadingService.hideLoading();
                  return [];
                })
              );
            } else {
              this.loadingService.hideLoading();
              return [];
            }
          })
        );
      })
    );
  });

  filterCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterCourses),
      switchMap((action) => {
        const { searchString } = action;
        return this.getCoursesBySearchString(searchString).pipe(
          switchMap((courseData: Course[]) => {
            return of(setCourses({ courses: courseData }));
          }),
          catchError((error) => {
            console.error(error.message);
            return [];
          })
        );
      })
    );
  });
}
