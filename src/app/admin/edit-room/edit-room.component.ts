import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  localHotel: Hotel = new Hotel();
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getHotelById(id).subscribe({
        next: (hotel) => {
          this.localHotel = { ...hotel };
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error('Failed to fetch hotel: ' + error.message);
          this.loading = false;
          this.router.navigate(['/admin/dashboard']);
        },
      });
    } else {
      this.toastr.error('Invalid hotel ID');
      this.router.navigate(['/admin/dashboard']);
    }
  }

  updateHotel() {
    if (!this.localHotel.name || !this.localHotel.location || !this.localHotel.price) {
      this.toastr.error('Please fill in all required fields');
      return;
    }
    this.loading = true;
    this.apiService.updateHotel(this.localHotel._id, this.localHotel).subscribe({
      next: () => {
        this.toastr.success('Hotel updated successfully');
        this.router.navigate(['/admin/dashboard']);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to update hotel: ' + error.message);
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}