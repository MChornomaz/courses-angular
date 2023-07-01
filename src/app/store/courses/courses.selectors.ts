import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

export const selectCoursesState =
  createFeatureSelector<CoursesState>('courses');

export const selectCourses = createSelector(
  selectCoursesState,
  (coursesState: CoursesState) => coursesState.courses
);
