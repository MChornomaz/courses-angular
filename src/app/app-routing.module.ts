import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseFormPageComponent } from './pages/course-form-page/course-form-page.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginPageComponent } from './pages/loginPage/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    canActivate: [AuthGuardService],
    path: 'courses',
    component: CoursesPageComponent,
  },
  {
    canActivate: [AuthGuardService],
    path: 'courses/new',
    component: CourseFormPageComponent,
  },
  {
    canActivate: [AuthGuardService],
    path: 'courses/:id',
    component: CourseFormPageComponent,
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'not-found', component: Page404Component },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
