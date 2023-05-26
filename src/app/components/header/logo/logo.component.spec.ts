import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo and text', () => {
    const compiled = fixture.nativeElement;
    const logo = compiled.querySelector('img');
    const text = compiled.querySelector('h1');
    expect(logo.src).toContain('assets/images/pngwing.com.png');
    expect(text.textContent).toContain('VIDEO COURSE');
  });
});
