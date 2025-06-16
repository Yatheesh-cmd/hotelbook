import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchTestimonials();
  }

  fetchTestimonials() {
    this.loading = true;
    this.apiService.getAllReviews().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch testimonials: ' + error.message);
        if (error.message.includes('token')) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  deleteTestimonial(id: string) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.loading = true;
      this.apiService.deleteReview(id).subscribe({
        next: () => {
          this.toastr.success('Testimonial deleted successfully');
          this.testimonials = this.testimonials.filter(t => t._id !== id);
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('Failed to delete testimonial: ' + error.message);
          this.loading = false;
        },
      });
    }
  }
}