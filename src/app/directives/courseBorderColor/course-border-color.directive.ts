import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseBorderColor]',
})
export class CourseBorderColorDirective implements OnInit {
  @Input() creationDate?: Date;
  @HostBinding('style.border') border = 'none';

  ngOnInit() {
    if (this.creationDate) {
      this.updateCoursePlateBorder();
    }
  }

  private updateCoursePlateBorder() {
    const currentDate = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14);

    if (
      this.creationDate &&
      this.creationDate < currentDate &&
      this.creationDate >= twoWeeksAgo
    ) {
      this.border = '2px solid green';
    } else if (this.creationDate && this.creationDate > currentDate) {
      this.border = '2px solid blue';
    } else {
      this.border = 'none';
    }
  }
}
