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
    id: '',
    title: '',
    creationDate: new Date(),
    duration: 0,
    description: '',
  };

  @Input() creationDate: Date = new Date();
  @Output() deleteButtonClicked = new EventEmitter<string>();
  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

  constructor(private router: Router) {}

  deleteButtonClickHandler() {
    this.deleteButtonClicked.emit(this.course.id);
  }

  editButtonHandler() {
    this.router.navigate(['courses', this.course.id]);
  }
}
