import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Course } from './../../../models/course.model';
import { deleteIcon, editIcon } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course: Course = {
    id: 0,
    name: '',
    date: new Date('2017-09-28T04:39:24+00:00'),
    length: 0,
    description: '',
    isTopRated: false,
  };

  @Input() creationDate: Date = new Date();
  @Output() deleteButtonClicked = new EventEmitter<number>();
  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;
  dateToDisplay = '';

  constructor(private router: Router) {
    this.dateToDisplay = this.formatDate(this.creationDate);
  }

  formatDate(date: Date): string {
    if (date) {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } else {
      return '';
    }
  }

  deleteButtonClickHandler() {
    this.deleteButtonClicked.emit(this.course.id);
  }

  editButtonHandler() {
    this.router.navigate(['courses', this.course.id]);
  }
}
