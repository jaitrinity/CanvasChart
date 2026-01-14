import { TestBed } from '@angular/core/testing';

import { HttpCacheServiceService } from './http-cache-service.service';

describe('HttpCacheServiceService', () => {
  let service: HttpCacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
