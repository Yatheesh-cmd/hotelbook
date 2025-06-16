import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: Hotel[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  addToCart(hotel: Hotel) {
    this.cartService.addToCart({ ...hotel, nights: 1 });
    this.toastr.success(`${hotel.name} added to cart`);
  }

  removeFromFavorites(id: string) {
    this.favoritesService.removeFromFavorites(id);
    this.toastr.info('Item removed from favorites');
  }
}