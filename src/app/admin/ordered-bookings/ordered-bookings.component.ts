import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ordered-bookings',
  templateUrl: './ordered-bookings.component.html',
  styleUrls: ['./ordered-bookings.component.css'],
})
export class OrderedBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.loading = true;
    this.apiService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch bookings: ' + error.message);
        if (error.message.includes('token')) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  updateStatus(bookingId: string, event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.loading = true;
    this.apiService.updateBookingStatus(bookingId, status).subscribe({
      next: () => {
        this.toastr.success('Booking status updated');
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to update status: ' + error.message);
        this.loading = false;
      },
    });
  }

  deleteBooking(bookingId: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.loading = true;
      this.apiService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.toastr.success('Booking deleted successfully');
          this.bookings = this.bookings.filter(booking => booking._id !== bookingId);
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('Failed to delete booking: ' + error.message);
          this.loading = false;
        },
      });
    }
  }
}