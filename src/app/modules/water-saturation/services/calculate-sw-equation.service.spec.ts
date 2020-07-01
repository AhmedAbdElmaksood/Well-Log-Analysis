import { TestBed } from '@angular/core/testing';

import { CalculateSwEquationService } from './calculate-sw-equation.service';

describe('CalculateSwEquationService', () => {
  let service: CalculateSwEquationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateSwEquationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
