import { TestBed } from '@angular/core/testing';

import { PromoCodeServiceService } from './promo-code-service.service';

describe('PromoCodeServiceService', () => {
  let service: PromoCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
