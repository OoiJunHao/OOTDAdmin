import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPromoCodeComponent } from './view-all-promo-code.component';

describe('ViewAllPromoCodeComponent', () => {
  let component: ViewAllPromoCodeComponent;
  let fixture: ComponentFixture<ViewAllPromoCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllPromoCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
