import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSellerComponent } from './header-seller.component';

describe('HeaderSellerComponent', () => {
  let component: HeaderSellerComponent;
  let fixture: ComponentFixture<HeaderSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSellerComponent]
    });
    fixture = TestBed.createComponent(HeaderSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
