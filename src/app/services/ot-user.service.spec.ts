import { TestBed } from '@angular/core/testing';

import { OtUserService } from './ot-user.service';

describe('OtUserService', () => {
  let service: OtUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
