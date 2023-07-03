import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validator,
  AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'app-form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormDurationComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FormDurationComponent,
      multi: true,
    },
  ],
})
export class FormDurationComponent implements ControlValueAccessor, Validator {
  @Output() durationChanged = new EventEmitter<number>();
  @Input() duration = 1;
  control: FormControl;
  invalidNumber = false;

  private onChange: any;
  private onTouch: any;

  constructor() {
    this.control = new FormControl(this.duration);
  }

  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      this.duration = value;
      this.control.setValue(this.duration);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value !== null && value !== undefined) {
      const isValidContent = /^[1-9][0-9]*$/.test(value);
      const isValidAmount = value && value > 0;
      const isValid = isValidContent && isValidAmount;
      this.invalidNumber = this.control.touched && !isValid;
      return isValid ? null : { invalidNumber: true };
    }
    return null;
  }

  onDurationChange(duration: number) {
    this.duration = duration;
    this.durationChanged.emit(this.duration);
    this.onChange(this.duration);
    this.onTouch();
    this.control.updateValueAndValidity();
  }
}
