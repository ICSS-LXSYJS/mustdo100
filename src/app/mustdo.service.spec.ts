import { TestBed } from '@angular/core/testing';

import { MustdoService } from './mustdo.service';

describe('MustdoService', () => {
  let service: MustdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MustdoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
