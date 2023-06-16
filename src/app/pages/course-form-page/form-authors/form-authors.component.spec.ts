import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthorsComponent } from './form-authors.component';

describe('FormAuthorsComponent', () => {
  let component: FormAuthorsComponent;
  let fixture: ComponentFixture<FormAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
