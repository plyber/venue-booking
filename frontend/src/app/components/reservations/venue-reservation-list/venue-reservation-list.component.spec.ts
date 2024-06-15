import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueReservationListComponent } from './venue-reservation-list.component';

describe('VenueReservationListComponent', () => {
  let component: VenueReservationListComponent;
  let fixture: ComponentFixture<VenueReservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueReservationListComponent]
    });
    fixture = TestBed.createComponent(VenueReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
