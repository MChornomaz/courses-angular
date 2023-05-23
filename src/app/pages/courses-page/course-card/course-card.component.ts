import { Component } from '@angular/core';
import { Course } from './../../../models/course.model';
import { deleteIcon, editIcon } from 'src/app/constants';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  card: Course = {
    id: 'course1',
    title: 'Video Course 1. Angular',
    creationDate: '9 Nov, 2022',
    duration: 126,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ducimus illo sequi consequatur quibusdam libero fuga, consequuntur dicta vero nihil voluptas? Quidem saepe fugiat voluptas in sit incidunt inventore numquam. Reprehenderit fugit aliquid nemo ipsa iusto voluptatem temporibus odit nihil provident voluptatibus tempora vero, esse natus ratione laborum quia eaque!',
  };

  editIconSvg = editIcon;
  deleteIconSvg = deleteIcon;

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
