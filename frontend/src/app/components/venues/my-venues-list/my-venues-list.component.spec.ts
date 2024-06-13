import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVenuesListComponent } from './my-venues-list.component';

describe('MyVenuesListComponent', () => {
  let component: MyVenuesListComponent;
  let fixture: ComponentFixture<MyVenuesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVenuesListComponent]
    });
    fixture = TestBed.createComponent(MyVenuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
