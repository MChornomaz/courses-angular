import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import {
  deleteCourse,
  loadMoreCourses,
} from 'src/app/store/courses/courses.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  isModalOpen = false;
  deleteCourseId = 0;
  currentCourseNumber = 5;
  showLoadMore = true;
  coursesSub$: Observable<Course[]>;

  constructor(private store: Store) {
    this.coursesSub$ = store.select(selectCourses);
  }

  ngOnInit() {
    this.coursesSub$.subscribe((courseData) => {
      this.courses = courseData;
    });
  }

  loadMoreClickHandler() {
    this.store.dispatch(
      loadMoreCourses({ start: this.currentCourseNumber, count: 5 })
    );
    this.currentCourseNumber += 5;
    this.coursesSub$.subscribe((courseData) => {
      this.courses = courseData;
    });
  }

  deleteCourseHandler(id: number) {
    this.store.dispatch(deleteCourse({ id: id.toString() }));
    this.closeModal();
  }

  trackByFn(index: number, course: Course): string {
    return course.id.toString();
  }

  openModal(id: number): void {
    this.isModalOpen = true;
    this.deleteCourseId = id;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
