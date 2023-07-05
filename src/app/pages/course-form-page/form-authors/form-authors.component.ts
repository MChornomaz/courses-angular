import {
  Component,
  Input,
  Output,
  ElementRef,
  HostListener,
  forwardRef,
  Renderer2,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Author } from 'src/app/models/course.model';

@Component({
  selector: 'app-form-authors',
  templateUrl: './form-authors.component.html',
  styleUrls: ['./form-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormAuthorsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormAuthorsComponent),
      multi: true,
    },
  ],
})
export class FormAuthorsComponent implements ControlValueAccessor {
  @Input() authors: Author[] = [];
  @Input() form: FormGroup;
  @Input() selectedAuthors: Author[] = [];
  searchTerm = '';
  filteredAuthors: Author[] = [];
  showAutocomplete = false;
  isAutocompleteClicked = false;
  isFieldTouched = false;
  isFormDataValid = false;

  @Output() authorsChanged = new EventEmitter<Author[]>();

  @ViewChild('autocompleteInput')
  autocompleteInput!: ElementRef<HTMLInputElement>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.form = new FormGroup({});
  }

  searchAuthors(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredAuthors = this.authors.filter((author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.showAutocomplete = true;

    if (searchTerm !== '') {
      const inputElement = this.elementRef.nativeElement.querySelector('input');
      this.renderer.removeClass(inputElement, 'border-red-500');
      this.renderer.removeClass(inputElement, 'error');
      this.onChange(this.selectedAuthors);
    }
  }

  addAuthor(author: Author) {
    const updatedAuthors = [...this.selectedAuthors, author];
    this.onChange(updatedAuthors);
    this.selectedAuthors = updatedAuthors;
    this.onTouched();
    this.updateFormValidity();
    this.authorsChanged.emit(this.selectedAuthors);
    this.searchTerm = '';
  }

  removeAuthor(index: number) {
    const updatedAuthors = this.selectedAuthors.filter((_, i) => i !== index);
    this.onChange(updatedAuthors);
    this.selectedAuthors = updatedAuthors;
    this.onTouched();
    this.updateFormValidity();
    this.authorsChanged.emit(this.selectedAuthors);
  }

  selectAuthorFromList(event: Event, author: Author) {
    event.stopPropagation();
    this.addAuthor(author);
    this.showAutocomplete = false;
  }

  onAutocompleteClick() {
    this.isAutocompleteClicked = true;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    const clickedOnAutocompleteInput =
      this.autocompleteInput.nativeElement.contains(target);

    if (!clickedInside && !clickedOnAutocompleteInput) {
      if (
        !this.isAutocompleteClicked &&
        this.isFieldTouched &&
        this.selectedAuthors.length === 0
      ) {
        const inputElement =
          this.elementRef.nativeElement.querySelector('input');
        this.renderer.addClass(inputElement, 'border-red-500');
        this.renderer.addClass(inputElement, 'error');
        this.onChange(null);
        this.onTouched();
      }
      this.showAutocomplete = false;
      this.isAutocompleteClicked = false;
      this.isFieldTouched = false;
    } else if (clickedOnAutocompleteInput) {
      this.isFieldTouched = true;
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedAuthors = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: FormControl): any {
    return this.selectedAuthors.length > 0 ? null : { noAuthorsSelected: true };
  }

  updateFormValidity() {
    const authorsControl = this.form.get('authors');
    const isAuthorsValid =
      authorsControl !== null && authorsControl.value.length > 0;

    this.isFormDataValid =
      this.form.valid &&
      !this.form.hasError('noAuthorsSelected') &&
      isAuthorsValid;
  }
}
