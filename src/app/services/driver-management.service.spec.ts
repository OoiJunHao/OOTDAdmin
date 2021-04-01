import { TestBed } from '@angular/core/testing';

import { DriverManagementService } from './driver-management.service';

describe('DriverManagementService', () => {
  let service: DriverManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
