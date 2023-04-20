import { TestBed } from '@angular/core/testing';

import { AuthCheckGuardService } from './auth-check-guard.service';

describe('AuthCheckGuardService', () => {
  let service: AuthCheckGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCheckGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
