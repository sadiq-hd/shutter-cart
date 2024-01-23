import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalSellerHomeComponent } from './external-seller-home.component';

describe('ExternalSellerHomeComponent', () => {
  let component: ExternalSellerHomeComponent;
  let fixture: ComponentFixture<ExternalSellerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalSellerHomeComponent]
    });
    fixture = TestBed.createComponent(ExternalSellerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
