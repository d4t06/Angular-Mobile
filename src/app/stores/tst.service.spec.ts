import { TestBed } from '@angular/core/testing';

import { TstService } from './tst.service';

describe('TstService', () => {
  let service: TstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
