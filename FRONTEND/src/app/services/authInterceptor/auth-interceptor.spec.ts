import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth-interceptor';

describe('Interceptor', () => {
  let service : typeof authInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(authInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
