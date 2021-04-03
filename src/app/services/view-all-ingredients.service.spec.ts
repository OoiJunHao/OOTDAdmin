import { TestBed } from '@angular/core/testing';

import { ViewAllIngredientsService } from './view-all-ingredients.service';

describe('ViewAllIngredientsService', () => {
  let service: ViewAllIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAllIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
