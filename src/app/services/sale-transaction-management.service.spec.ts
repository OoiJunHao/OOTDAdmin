import { TestBed } from '@angular/core/testing';

import { SaleTransactionManagementService } from './sale-transaction-management.service';

describe('SaleTransactionManagementService', () => {
  let service: SaleTransactionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleTransactionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
