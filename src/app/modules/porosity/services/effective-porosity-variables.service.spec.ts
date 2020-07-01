import { TestBed } from '@angular/core/testing';

import { EffectivePorosityVariablesService } from './effective-porosity-variables.service';

describe('EffectivePorosityVariablesService', () => {
  let service: EffectivePorosityVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectivePorosityVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
