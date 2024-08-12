import { TestBed } from '@angular/core/testing';

import { PetStatService } from './pet-stat.service';

describe('PetStatService', () => {
  let service: PetStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
