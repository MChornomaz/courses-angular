import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent implements OnInit {
  @Input() buttonText = 'Add Course';
  @Input() svgIcon = '';

  sanitizedSvgIcon?: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizedSvgIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.svgIcon
    );
  }
}
