import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from '../../../services/courses/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  isModalOpen = false;
  deleteCourseId = 0;
  subscription: Subscription;
  currentCourseNumber = 5;
  showLoadMore = true;

  constructor(private coursesService: CoursesService) {
    this.subscription = this.coursesService.coursesChanged$.subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      }
    );
  }

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  loadMoreClickHandler() {
    this.coursesService
      .fetchCourses(this.currentCourseNumber, 5)
      .subscribe((newCourses: Course[]) => {
        this.courses = [...this.courses, ...newCourses];
        this.currentCourseNumber += 5;
        if (newCourses.length < 5) {
          this.showLoadMore = false;
        }
      });
  }

  deleteCourseHandler(id: number) {
    this.coursesService.removeCourse(id);
    this.courses = this.coursesService.getList();
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
