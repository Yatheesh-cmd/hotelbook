import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    username: sessionStorage.getItem('user') || '',
    email: sessionStorage.getItem('email') || '',
    address: '',
    phone: '',
  };
  review = { bookingId: '', rating: 1, comment: '' };
  reviews: any[] = [];
  fetchBookingId = '';
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  handleProfileSubmit() {
    this.loading = true;
    this.toastr.info('Profile update not implemented in backend.');
    this.loading = false;
  }

  handleReviewSubmit() {
    this.loading = true;
    this.apiService.createReview(this.review).subscribe({
      next: () => {
        this.toastr.success('Review submitted successfully');
        this.review = { bookingId: '', rating: 1, comment: '' };
        if (this.fetchBookingId === this.review.bookingId) {
          this.fetchReviews();
        }
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Review submission failed: ' + error.message);
        this.loading = false;
      },
    });
  }

  fetchReviews() {
    if (!this.fetchBookingId) {
      this.toastr.error('Please enter a booking ID');
      return;
    }
    this.loading = true;
    this.apiService.getBookingReviews(this.fetchBookingId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch reviews: ' + error.message);
        this.loading = false;
      },
    });
  }
}