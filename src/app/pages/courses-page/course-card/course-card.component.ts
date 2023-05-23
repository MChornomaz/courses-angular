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
    creationDate: '',
    duration: 0,
    description: '',
  };
  @Output() deleteButtonClicked = new EventEmitter<string>();
  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

  deleteButtonClickHandler() {
    this.deleteButtonClicked.emit(this.course.id);
  }

  editButtonHandler() {
    console.log('Edit button pressed');
  }

  setDuration(time: number) {
    const fullHours = Math.floor(time / 60);
    const minutes = time % 60;
    let finalHours = '';
    let finalMinutes = '';

    finalHours = `${fullHours}h`;
    if (minutes < 10) {
      finalMinutes = `0${minutes}min`;
    } else {
      finalMinutes = `${minutes}min`;
    }
    return `${finalHours} ${finalMinutes}`;
  }
}
