import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSecondaryComponent } from './navbar-secondary.component';

describe('NavbarSecondaryComponent', () => {
  let component: NavbarSecondaryComponent;
  let fixture: ComponentFixture<NavbarSecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSecondaryComponent]
    });
    fixture = TestBed.createComponent(NavbarSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
