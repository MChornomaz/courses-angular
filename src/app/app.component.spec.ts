import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SearchCourseComponent } from './pages/courses-page/search-course/search-course.component';
import { MainButtonComponent } from './html/buttons/main-button/main-button.component';
import { CoursesListComponent } from './pages/courses-page/courses-list/courses-list.component';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from './pages/courses-page/course-card/course-card.component';
import { OrderByDatePipe } from './pipes/OrderByDate/order-by-date.pipe';
import { DurationPipe } from './pipes/DurationPipe/duration-pipe.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        CoursesPageComponent,
        FooterComponent,
        LogoComponent,
        SearchCourseComponent,
        MainButtonComponent,
        CoursesListComponent,
        CourseCardComponent,
        OrderByDatePipe,
        DurationPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain app-header component', () => {
    const headerComponent = fixture.nativeElement.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('should contain app-navigation component', () => {
    const navigationComponent =
      fixture.nativeElement.querySelector('app-navigation');
    expect(navigationComponent).toBeTruthy();
  });

  it('should contain app-courses-page component', () => {
    const coursesPageComponent =
      fixture.nativeElement.querySelector('app-courses-page');
    expect(coursesPageComponent).toBeTruthy();
  });

  it('should contain app-footer component', () => {
    const footerComponent = fixture.nativeElement.querySelector('app-footer');
    expect(footerComponent).toBeTruthy();
  });
});
