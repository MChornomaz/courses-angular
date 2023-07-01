import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';

export const getCourses = createAction('[Courses] getCourses');

export const loadMoreCourses = createAction(
  '[Courses] loadMore',
  props<{ start: number; count: number }>()
);

export const setCourses = createAction(
  '[Courses] setCourses',
  props<{ courses: Course[] }>()
);

export const addMoreCourses = createAction(
  '[Courses] addMoreCourses',
  props<{ courses: Course[] }>()
);

export const deleteCourse = createAction(
  '[Courses] delete course',
  props<{ id: string }>()
);

export const filterCourses = createAction(
  '[Courses] filterCourses',
  props<{ searchString: string }>()
);

export const createCourse = createAction(
  '[Courses] createCourse',
  props<{ newCourse: Course }>()
);

export const updateCourse = createAction(
  '[Courses] updateCourse',
  props<{ id: string; newCourse: Course }>()
);
