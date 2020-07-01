import { TestBed } from '@angular/core/testing';

import { PorosityEquationsService } from './porosity-equations.service';

describe('PorosityEquationsService', () => {
  let service: PorosityEquationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorosityEquationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
