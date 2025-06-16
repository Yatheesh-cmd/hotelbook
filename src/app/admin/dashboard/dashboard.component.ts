import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchHotels();
  }

  fetchHotels() {
    this.loading = true;
    this.apiService.getAllHotels().subscribe({
      next: (hotels) => {
        this.hotels = hotels;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch hotels: ' + error.message);
        if (error.message.includes('token')) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  deleteHotel(id: string) {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.loading = true;
      this.apiService.deleteHotel(id).subscribe({
        next: () => {
          this.toastr.success('Hotel deleted successfully');
          this.hotels = this.hotels.filter(hotel => hotel._id !== id);
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('Failed to delete hotel: ' + error.message);
          this.loading = false;
        },
      });
    }
  }

  navigateToAddRoom() {
    this.router.navigate(['/admin/add-room']);
  }

  navigateToEditRoom(id: string) {
    this.router.navigate(['/admin/edit-room', id]);
  }
}