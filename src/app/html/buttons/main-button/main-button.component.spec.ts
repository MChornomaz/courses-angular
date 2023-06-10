import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MainButtonComponent } from './main-button.component';

describe('MainButtonComponent', () => {
  let component: MainButtonComponent;
  let fixture: ComponentFixture<MainButtonComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainButtonComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set sanitizedSvgIcon with provided svgIcon', () => {
    const svgIcon = '<svg>...</svg>';
    component.svgIcon = svgIcon;
    component.ngOnInit();
    const sanitizedSvgIcon = sanitizer.bypassSecurityTrustHtml(svgIcon);
    expect(component.sanitizedSvgIcon).toEqual(sanitizedSvgIcon);
  });

  it('should render button with text and svgIcon', () => {
    const buttonText = 'Test Button';
    const svgIcon = '<svg>...</svg>';
    component.buttonText = buttonText;
    component.svgIcon = svgIcon;
    component.ngOnInit();
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    const svgElement = buttonElement.querySelector('svg');
    expect(buttonElement.textContent).toContain(buttonText);
    expect(svgElement.innerHTML).toEqual(svgIcon);
  });
});
