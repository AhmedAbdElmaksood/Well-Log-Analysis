import { TestBed } from '@angular/core/testing';

import { PorosityParametersService } from './porosity-parameters.service';

describe('PorosityParametersService', () => {
  let service: PorosityParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorosityParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
