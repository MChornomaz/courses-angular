import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import { MainButtonComponent } from 'src/app/html/buttons/main-button/main-button.component';
import { DurationPipe } from '../../../pipes/DurationPipe/duration-pipe.pipe';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent, MainButtonComponent, DurationPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteButtonClicked event on deleteButtonClickHandler', () => {
    const courseId = '123';
    let emittedCourseId: string | undefined;

    component.course = {
      id: courseId,
      title: 'Test Course',
      creationDate: new Date(2023, 1, 1),
      duration: 90,
      description: 'This is a test course.',
    };

    component.deleteButtonClicked.subscribe((id: string) => {
      emittedCourseId = id;
    });

    component.deleteButtonClickHandler();

    expect(emittedCourseId).toBe(courseId);
  });

  it('should log "Edit button pressed" on editButtonHandler', () => {
    spyOn(console, 'log');
    component.editButtonHandler();
    expect(console.log).toHaveBeenCalledWith('Edit button pressed');
  });
});
