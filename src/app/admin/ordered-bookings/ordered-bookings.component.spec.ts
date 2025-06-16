import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedBookingsComponent } from './ordered-bookings.component';

describe('OrderedBookingsComponent', () => {
  let component: OrderedBookingsComponent;
  let fixture: ComponentFixture<OrderedBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderedBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
