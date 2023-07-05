import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { addMoreCourses, setCourses } from './courses.actions';

export interface CoursesState {
  courses: Course[];
}

export const initialState: CoursesState = {
  courses: [
    {
      id: 0,
      name: '',
      date: new Date(),
      length: 0,
      description: '',
      isTopRated: false,
      authors: [{ id: '', name: '' }],
    },
  ],
};

export const coursesReducer = createReducer(
  initialState,
  on(setCourses, (state, action): CoursesState => {
    return {
      ...state,
      courses: action.courses,
    };
  }),
  on(addMoreCourses, (state, action): CoursesState => {
    return {
      ...state,
      courses: [...state.courses, ...action.courses],
    };
  })
);
