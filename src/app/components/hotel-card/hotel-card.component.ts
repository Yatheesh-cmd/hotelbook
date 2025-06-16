import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from '../../models/hotel.model';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css'],
})
export class HotelCardComponent {
  @Input() hotel: Hotel = new Hotel();

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) {}

  addToCart() {
    this.cartService.addToCart({ ...this.hotel, nights: 1 });
    this.toastr.success(`${this.hotel.name} added to cart`);
  }

  addToFavorites() {
    if (this.favoritesService.isInFavorites(this.hotel._id)) {
      this.toastr.info(`${this.hotel.name} is already in your favorites`);
    } else {
      this.favoritesService.addToFavorites(this.hotel);
      this.toastr.success(`${this.hotel.name} added to favorites`);
    }
  }

  getTruncatedDescription(): string {
    const desc = this.hotel?.description || '';
    if (!desc) return 'No description';
    return desc.length > 30 ? desc.slice(0, 30) + '...' : desc;
  }
}
