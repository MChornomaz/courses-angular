import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourseComponent } from './search-course.component';
import { FormsModule } from '@angular/forms';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCourseComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchString when input value changes', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const testValue = 'Test Search';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchString).toEqual(testValue);
  });

  it('should call searchHandler method when search button is clicked', () => {
    spyOn(component, 'searchHandler');
    const searchButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    searchButton.click();
    fixture.detectChanges();

    expect(component.searchHandler).toHaveBeenCalled();
  });

  it('should log searchString when searchHandler method is called', () => {
    spyOn(console, 'log');
    const testValue = 'Test Search';
    component.searchString = testValue;

    component.searchHandler();

    expect(console.log).toHaveBeenCalledWith(testValue);
  });
});
