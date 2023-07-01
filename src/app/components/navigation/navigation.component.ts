import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  courses: Course[] = [];
  coursesSub: Observable<Course[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.coursesSub = store.select(selectCourses);
  }
  courseTitle = '';

  getCourseById(id: number) {
    const result = this.courses.find((el) => el.id == id);
    if (!result) {
      throw new Error('Course was not found, please check the Id');
    }
    return result;
  }

  ngOnInit() {
    this.coursesSub.subscribe((coursesData) => {
      this.courses = coursesData;
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          return this.route.root.firstChild?.snapshot?.params['id'];
        })
      )
      .subscribe((id) => {
        const courseId = id ? id : null;
        if (courseId) {
          const title = this.getCourseById(courseId).name;
          this.courseTitle = `/${title}`;
        } else {
          this.courseTitle = '';
        }
      });
  }
}
