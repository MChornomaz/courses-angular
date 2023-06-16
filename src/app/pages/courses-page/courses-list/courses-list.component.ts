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
  deleteCourseId = '';
  subscription: Subscription;

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
    console.log('Load more button pressed!');
  }

  deleteCourseHandler(id: string) {
    this.coursesService.removeCourse(id);
    this.courses = this.coursesService.getList();
    this.closeModal();
  }

  trackByFn(index: number, course: Course): string {
    return course.id;
  }

  openModal(id: string): void {
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
