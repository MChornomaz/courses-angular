import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormDateComponent),
      multi: true,
    },
  ],
})
export class FormDateComponent implements ControlValueAccessor, Validator {
  @Output() dateChanged = new EventEmitter<string>();
  @Input() date = '';
  @Input() courseForm: FormGroup;
  private onChange: (value: any) => void = () => {};
  private onTouch: () => void = () => {};
  touched = false;

  constructor() {
    this.courseForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
    });
  }

  validate(control: FormControl) {
    if (!this.onTouch || !this.touched) {
      return null;
    }

    const date = control.value;
    if (
      Validators.required(control) ||
      (date && !this.isValidDateFormat(date))
    ) {
      return {
        invalidDate: true,
      };
    }
    return null;
  }

  writeValue(value: any) {
    if (value) {
      const dateObject = new Date(value);
      const year = dateObject.getFullYear();
      const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObject.getDate()).slice(-2);
      this.date = `${day}/${month}/${year}`;
    } else {
      this.date = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onDateChange(event: any) {
    const date = event.target.value;
    this.date = date;
    this.dateChanged.emit(this.date);
    this.onChange(this.date);
    this.onTouch();
    this.touched = true;

    if (this.date.trim() === '') {
      this.courseForm.controls['date'].setErrors({ required: true });
    } else {
      this.courseForm.controls['date'].setErrors(null);
    }
  }

  isValidDateFormat(date: string) {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    return pattern.test(date);
  }

  onTouchHandler() {
    this.touched = true;
  }
}
