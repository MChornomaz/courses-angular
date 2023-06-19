import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}
  courseTitle = '';

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const firstChild = this.route.root.firstChild;
          if (firstChild) {
            const snapshot = firstChild.snapshot;
            if (snapshot) {
              return snapshot.params['id'];
            }
          }
          return null;
        })
      )
      .subscribe((id) => {
        const courseId = id ? id : null;
        if (courseId) {
          const title = this.coursesService.getCourseById(courseId).title;
          this.courseTitle = `/${title}`;
        } else {
          this.courseTitle = '';
        }
      });
  }
}
