import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { MainButtonComponent } from 'src/app/html/buttons/main-button/main-button.component';
import { COURSE_LIST } from 'src/app/constants';
import { Course } from 'src/app/models/course.model';
import { OrderByDatePipe } from '../../../pipes/OrderByDate/order-by-date.pipe';
import { DurationPipe } from '../../../pipes/DurationPipe/duration-pipe.pipe';
import { ModalComponent } from '../../../html/modal/modal/modal.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseCardComponent,
        MainButtonComponent,
        OrderByDatePipe,
        DurationPipe,
        ModalComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = COURSE_LIST;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses with COURSE_LIST data', () => {
    expect(component.courses).toEqual(COURSE_LIST);
  });

  it('should render app-course-card for each course in courses array', () => {
    const courseCardComponents =
      fixture.nativeElement.querySelectorAll('app-course-card');
    expect(courseCardComponents.length).toBe(component.courses.length);
  });

  it('should render course cards for each course item', () => {
    const courseCards =
      fixture.nativeElement.querySelectorAll('app-course-card');
    expect(courseCards.length).toBe(component.courses.length);

    component.courses.forEach((course: Course) => {
      const courseCardComponentFixture =
        TestBed.createComponent(CourseCardComponent);
      const courseCardComponent = courseCardComponentFixture.componentInstance;

      courseCardComponent.course = course;

      courseCardComponentFixture.detectChanges();

      expect(courseCardComponent.course).toEqual(course);
    });
  });

  it('should call loadMoreClickHandler when load more button is clicked', () => {
    spyOn(component, 'loadMoreClickHandler');
    const loadMoreButton = fixture.nativeElement.querySelector('#load-more');
    fixture.detectChanges();
    loadMoreButton.click();
    expect(component.loadMoreClickHandler).toHaveBeenCalled();
  });

  it('should log "Load more button pressed!" when loadMoreClickHandler activates', () => {
    spyOn(console, 'log');
    component.loadMoreClickHandler();
    expect(console.log).toHaveBeenCalledWith('Load more button pressed!');
  });

  it('should call deleteCourseHandler with course id when delete button is clicked', () => {
    spyOn(component, 'deleteCourseHandler');
    const courseItem = COURSE_LIST[0];
    const courseCardComponent =
      fixture.nativeElement.querySelector('app-course-card');
    courseCardComponent.course = courseItem;
    courseCardComponent.dispatchEvent(new Event('deleteButtonClicked'));
    fixture.detectChanges();
    expect(component.deleteCourseHandler).toHaveBeenCalledWith(courseItem.id);
  });

  it('should log "Load more button pressed!" when loadMoreClickHandler activates', () => {
    spyOn(console, 'log');
    component.deleteCourseHandler('test');
    expect(console.log).toHaveBeenCalledWith(
      'Course to delete has id: ',
      'test'
    );
  });
});
