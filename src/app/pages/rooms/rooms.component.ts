import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  hotels: Hotel[] = [];
  search: string = '';

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiService.getSearchQuery().subscribe(query => {
      this.search = query;
      this.fetchHotels();
    });
  }

  fetchHotels() {
    this.apiService.getAllHotels(this.search).subscribe({
      next: (hotels) => {
        this.hotels = hotels;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch hotels: ' + error.message);
      },
    });
  }
}