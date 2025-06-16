import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  hotel: Hotel = new Hotel();
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  addHotel() {
    if (!this.hotel.name || !this.hotel.location || !this.hotel.price) {
      this.toastr.error('Please fill in all required fields');
      return;
    }
    this.loading = true;
    this.apiService.addHotel(this.hotel).subscribe({
      next: () => {
        this.toastr.success('Hotel added successfully');
        this.router.navigate(['/admin/dashboard']);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to add hotel: ' + error.message);
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}