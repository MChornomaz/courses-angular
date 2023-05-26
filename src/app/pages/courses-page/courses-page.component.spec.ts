import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { MainButtonComponent } from 'src/app/html/buttons/main-button/main-button.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from './course-card/course-card.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        SearchCourseComponent,
        MainButtonComponent,
        NavigationComponent,
        CoursesListComponent,
        CourseCardComponent,
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the SearchCourseComponent', () => {
    const searchCourseComponent =
      fixture.nativeElement.querySelector('app-search-course');
    expect(searchCourseComponent).toBeTruthy();
  });

  it('should run addCourseHandler when add course button pressed', () => {
    spyOn(component, 'addCourseHandler');
    const buttonComponent = fixture.nativeElement.querySelector('#add-course');
    fixture.detectChanges();
    buttonComponent.click();
    expect(component.addCourseHandler).toHaveBeenCalled();
  });

  it('should log "Add course button pressed" when add course button pressed', () => {
    spyOn(console, 'log');
    component.addCourseHandler();
    expect(console.log).toHaveBeenCalledWith('Add course button pressed');
  });

  it('should render the ButtonComponent with correct properties', () => {
    const buttonComponent = fixture.nativeElement.querySelector('#add-course');
    expect(buttonComponent).toBeTruthy();
    expect(buttonComponent.textContent.trim()).toBe('Add Course');
    expect(buttonComponent.querySelector('svg')).toBeTruthy();
  });
});
