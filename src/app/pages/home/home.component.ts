import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { FavoritesService } from '../../services/favorites.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularHotels: Hotel[] = [];
  loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.fetchPopularHotels();
  }

  fetchPopularHotels() {
    this.apiService.sampleHotels().subscribe({
      next: (hotels) => {
        this.popularHotels = hotels;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load hotels: ' + error.message);
        this.loading = false;
      },
    });
  }

  addToFavorites(hotel: Hotel) {
    if (this.favoritesService.isInFavorites(hotel._id)) {
      this.toastr.info(`${hotel.name} is already in your favorites`);
    } else {
      this.favoritesService.addToFavorites(hotel);
      this.toastr.success(`${hotel.name} added to favorites`);
    }
  }
}