import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from './../../../models/course.model';
import { deleteIcon, editIcon } from 'src/app/constants';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
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

  deleteButtonClickHandler() {
    this.deleteButtonClicked.emit(this.course.id);
  }

  editButtonHandler() {
    console.log('Edit button pressed');
  }
}
