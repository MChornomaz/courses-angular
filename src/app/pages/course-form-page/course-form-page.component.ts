import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author, Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import {
  createCourse,
  updateCourse,
} from 'src/app/store/courses/courses.actions';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss'],
})
export class CourseFormPageComponent implements OnInit {
  courses: Course[] = [];
  coursesSub: Observable<Course[]>;
  courseForm: FormGroup;
  date = '';
  duration = 1;
  editPage = false;
  isFormDataValid = false;
  authors: Author[] = [];
  selectedAuthors: Author[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.coursesSub = store.select(selectCourses);

    this.courseForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      date: ['', Validators.required],
      duration: [0, Validators.required],
      authors: [[], Validators.required],
    });
  }

  getAuthors() {
    return this.http.get<Author[]>('http://localhost:3004/authors');
  }

  ngOnInit() {
    this.getAuthors().subscribe((authorsData) => {
      this.authors = authorsData;
    });
    this.courseForm
      .get('authors')
      ?.valueChanges.subscribe((authors: Author[]) => {
        this.updateFormAuthorsValidity(authors);
      });
    this.updateFormValidity();
    const id = this.route.snapshot.params['id'];
    this.editPage = id ? true : false;
    this.coursesSub.subscribe((coursesData) => {
      this.courses = coursesData;
    });

    if (id) {
      const courseToEdit = this.getCourseById(parseInt(id, 10));
      if (courseToEdit) {
        const formattedDate = formatDate(
          courseToEdit.date,
          'yyyy-MM-dd',
          'en-US'
        );

        this.courseForm.patchValue({
          title: courseToEdit.name,
          description: courseToEdit.description,
          date: formattedDate,
          duration: courseToEdit.length,
          authors: courseToEdit.authors,
        });

        this.selectedAuthors = this.courseForm.get('authors')?.value;
      }
    }
  }

  getCourseById(id: number) {
    const result = this.courses.find((el) => el.id == id);
    if (!result) {
      throw new Error('Course was not found, please check the Id');
    }
    return result;
  }

  saveHandler() {
    if (this.courseForm.invalid) {
      return;
    }
    if (this.editPage) {
      const id = this.route.snapshot.params['id'];
      const updatedCourse: Course = {
        id: id,
        name: this.courseForm.value.title,
        length: this.courseForm.value.duration,
        date: new Date(this.courseForm.value.date),
        description: this.courseForm.value.description,
        isTopRated: false,
        authors: this.courseForm.value.authors,
      };
      this.store.dispatch(updateCourse({ id, newCourse: updatedCourse }));
    } else {
      const newCourse: Course = {
        id: new Date().getMilliseconds(),
        name: this.courseForm.value.title,
        length: this.courseForm.value.duration,
        date: new Date(this.courseForm.value.date),
        description: this.courseForm.value.description,
        isTopRated: false,
        authors: this.courseForm.value.authors,
      };
      this.store.dispatch(createCourse({ newCourse }));
    }
    this.router.navigate(['courses']);
  }

  onDateChange(date: string) {
    this.date = date;
    this.courseForm.patchValue({ date: date || null });
    this.updateFormValidity();
  }

  onDurationChanges(duration: number) {
    this.duration = duration;
    this.updateFormValidity();
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateFormAuthorsValidity(authors: Author[]) {
    const authorsControl = this.courseForm.get('authors');
    if (authorsControl) {
      if (JSON.stringify(authors) !== JSON.stringify(this.selectedAuthors)) {
        authorsControl.setValue(authors, { emitEvent: false });
        this.selectedAuthors = authors;
      }
    }
    this.updateFormValidity();
  }

  updateFormValidity() {
    const authorsControl = this.courseForm.get('authors');
    const isAuthorsValid =
      authorsControl != null && authorsControl.value.length > 0;

    this.isFormDataValid = this.courseForm.valid && isAuthorsValid;
  }
}
