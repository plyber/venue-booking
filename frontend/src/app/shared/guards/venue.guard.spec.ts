import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { venueGuard } from './venue.guard';

describe('venueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => venueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
