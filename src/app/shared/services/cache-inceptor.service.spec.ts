import { TestBed } from '@angular/core/testing';

import { CacheInceptorService } from './cache-inceptor.service';

describe('CacheInceptorService', () => {
  let service: CacheInceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheInceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
