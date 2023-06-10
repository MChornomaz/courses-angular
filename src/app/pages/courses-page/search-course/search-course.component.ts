import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { searchIconSvg } from 'src/app/constants';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
})
export class SearchCourseComponent {
  searchString = '';
  searchIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchIconSvg);
  }

  searchHandler() {
    console.log(this.searchString);
  }
}
