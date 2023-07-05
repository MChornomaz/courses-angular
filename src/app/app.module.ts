import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CourseCardComponent } from './pages/courses-page/course-card/course-card.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { NgModule, isDevMode } from '@angular/core';
import { SearchCourseComponent } from './pages/courses-page/search-course/search-course.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CoursesListComponent } from './pages/courses-page/courses-list/courses-list.component';
import { MainButtonComponent } from './html/buttons/main-button/main-button.component';
import { FormsModule } from '@angular/forms';
import { CourseBorderColorDirective } from './directives/courseBorderColor/course-border-color.directive';
import { DurationPipe } from './pipes/DurationPipe/duration-pipe.pipe';
import { OrderByDatePipe } from './pipes/OrderByDate/order-by-date.pipe';
import { FilterPipe } from './pipes/FilterPipe/filter.pipe';
import { ModalComponent } from './html/modal/modal/modal.component';
import { LoginPageComponent } from './pages/loginPage/login-page/login-page.component';
import { IfAuthenticatedDirective } from './directives/ifAuthenticated/if-authenticated.directive';
import { CourseFormPageComponent } from './pages/course-form-page/course-form-page.component';
import { FormDateComponent } from './pages/course-form-page/form-date/form-date.component';
import { FormDurationComponent } from './pages/course-form-page/form-duration/form-duration.component';
import { FormAuthorsComponent } from './pages/course-form-page/form-authors/form-authors.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingBlockComponent } from './html/loading/loading-block.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { coursesReducer } from './store/courses/courses.reducer';
import { CoursesEffects } from './store/courses/courses.effects';
import { ReactiveFormsModule } from '@angular/forms';

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
    ModalComponent,
    LoginPageComponent,
    IfAuthenticatedDirective,
    CourseFormPageComponent,
    FormDateComponent,
    FormDurationComponent,
    FormAuthorsComponent,
    Page404Component,
    LoadingBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      auth: authReducer,
      courses: coursesReducer,
    }),
    EffectsModule.forRoot([AuthEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
