import { TestBed } from '@angular/core/testing';

import { VshEquationsService } from './vsh-equations.service';

describe('VshEquationsService', () => {
  let service: VshEquationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VshEquationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
