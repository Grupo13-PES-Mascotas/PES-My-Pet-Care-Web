import { TestBed } from '@angular/core/testing';

import { PetApiService } from './pet-api.service';

describe('PetApiService', () => {
  let service: PetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
