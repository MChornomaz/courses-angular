import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.scss'],
})
export class FormDurationComponent {
  @Output() durationChanged = new EventEmitter<number>();
  @Input() duration = 0;

  onDurationChange() {
    this.durationChanged.emit(this.duration);
  }
}