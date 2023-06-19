import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent {
  @Output() dateChanged = new EventEmitter<string>();
  @Input() date = '';

  onDateChange() {
    this.dateChanged.emit(this.date);
  }
}
