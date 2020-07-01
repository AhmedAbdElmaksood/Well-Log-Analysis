import { TestBed } from '@angular/core/testing';

import { FileInformationService } from './file-information.service';

describe('HeaderInformationService', () => {
  let service: FileInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
