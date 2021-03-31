import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSalesTransactionComponent } from './view-all-sales-transaction.component';

describe('ViewAllSalesTransactionComponent', () => {
  let component: ViewAllSalesTransactionComponent;
  let fixture: ComponentFixture<ViewAllSalesTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllSalesTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSalesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
