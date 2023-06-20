import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormPageComponent } from './course-form-page.component';

describe('CourseFormPageComponent', () => {
  let component: CourseFormPageComponent;
  let fixture: ComponentFixture<CourseFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
