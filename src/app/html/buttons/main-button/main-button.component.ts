import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent implements OnInit {
  @Input() buttonText = 'Add Course';
  @Input() svgIcon: string | null = '';

  sanitizedSvgIcon?: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.svgIcon) {
      this.sanitizedSvgIcon = this.sanitizer.bypassSecurityTrustHtml(
        this.svgIcon
      );
    }
  }
}
