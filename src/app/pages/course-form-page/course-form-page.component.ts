import { Component } from '@angular/core';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss'],
})
export class CourseFormPageComponent {
  title = '';
  description = '';
  date = '';
  duration = 0;

  saveHandler() {
    console.log('Course saved');
    console.log('title', this.title);
    console.log('description', this.description);
    console.log('date', this.date);
    console.log('duration', this.duration);
  }

  cancelHandler() {
    console.log('Course creation canceled');
  }

  onDateChange(date: string) {
    this.date = date;
  }
  onDurationChange(duration: number) {
    this.duration = duration;
  }
}
