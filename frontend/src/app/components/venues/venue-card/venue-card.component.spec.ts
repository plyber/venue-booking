import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCardComponent } from './venue-card.component';

describe('VenueCardComponent', () => {
  let component: VenueCardComponent;
  let fixture: ComponentFixture<VenueCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueCardComponent],
    });
    fixture = TestBed.createComponent(VenueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
