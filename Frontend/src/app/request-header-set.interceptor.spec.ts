import { TestBed } from '@angular/core/testing';

import { RequestHeaderSetInterceptor } from './request-header-set.interceptor';

describe('RequestHeaderSetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestHeaderSetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestHeaderSetInterceptor = TestBed.inject(RequestHeaderSetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
