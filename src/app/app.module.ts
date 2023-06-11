import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CourseCardComponent } from './pages/courses-page/course-card/course-card.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { NgModule } from '@angular/core';
import { SearchCourseComponent } from './pages/courses-page/search-course/search-course.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CoursesListComponent } from './pages/courses-page/courses-list/courses-list.component';
import { MainButtonComponent } from './html/buttons/main-button/main-button.component';
import { FormsModule } from '@angular/forms';
import { CourseBorderColorDirective } from './directives/courseBorderColor/course-border-color.directive';
import { DurationPipe } from './pipes/DurationPipe/duration-pipe.pipe';
import { OrderByDatePipe } from './pipes/OrderByDate/order-by-date.pipe';
import { FilterPipe } from './pipes/FilterPipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    CoursesPageComponent,
    SearchCourseComponent,
    CourseCardComponent,
    NavigationComponent,
    CoursesListComponent,
    MainButtonComponent,
    CourseBorderColorDirective,
    DurationPipe,
    OrderByDatePipe,
    FilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
