import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter();

  closeModal(): void {
    this.closed.emit();
  }
}
