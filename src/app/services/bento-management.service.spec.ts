import { TestBed } from '@angular/core/testing';

import { BentoManagementService } from './bento-management.service';

describe('BentoManagementService', () => {
  let service: BentoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BentoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
