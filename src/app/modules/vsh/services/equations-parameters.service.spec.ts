import { TestBed } from '@angular/core/testing';

import { EquationsParametersService } from './equations-parameters.service';

describe('EquationsParametersService', () => {
  let service: EquationsParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquationsParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
