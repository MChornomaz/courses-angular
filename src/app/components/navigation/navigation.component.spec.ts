import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a navigation menu', () => {
    const compiled = fixture.nativeElement;
    const nav = compiled.querySelector('nav');
    const list = compiled.querySelector('ul');
    const listItem = compiled.querySelector('li');
    const link = compiled.querySelector('a');

    expect(nav).toBeTruthy();
    expect(list).toBeTruthy();
    expect(listItem).toBeTruthy();
    expect(link.textContent).toContain('Courses');
  });
});
