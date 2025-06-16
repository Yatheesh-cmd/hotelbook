import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | null = null;
  activeSlideIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Scroll to top on component load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getHotelById(id).subscribe({
        next: (hotel) => {
          this.hotel = hotel;
        },
        error: (error) => {
          this.toastr.error('Failed to fetch hotel details: ' + error.message);
          this.router.navigate(['/rooms']);
        },
      });
    }
  }

  addToCart() {
    if (this.hotel) {
      this.cartService.addToCart({ ...this.hotel, nights: 1 });
      this.toastr.success(`${this.hotel.name} added to cart`);
    }
  }

  addToFavorites() {
    if (this.hotel) {
      if (this.favoritesService.isInFavorites(this.hotel._id)) {
        this.toastr.info(`${this.hotel.name} is already in your favorites`);
      } else {
        this.favoritesService.addToFavorites(this.hotel);
        this.toastr.success(`${this.hotel.name} added to favorites`);
      }
    }
  }

  setActiveSlide(index: number) {
    this.activeSlideIndex = index;
    const carousel = document.getElementById('hotelCarousel');
    if (carousel) {
      const bsCarousel = (window as any).bootstrap.Carousel.getOrCreateInstance(carousel);
      bsCarousel.to(index);
    }
  }
}
