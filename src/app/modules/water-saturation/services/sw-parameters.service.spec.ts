import { TestBed } from '@angular/core/testing';

import { SwParametersService } from './sw-parameters.service';

describe('SwParametersService', () => {
  let service: SwParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
