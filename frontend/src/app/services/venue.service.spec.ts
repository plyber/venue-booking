import { TestBed } from '@angular/core/testing';

import { VenueService } from './venue.service';

describe('DataService', () => {
  let service: VenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
