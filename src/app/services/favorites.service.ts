import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Hotel[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  private favoritesSubject = new BehaviorSubject<Hotel[]>(this.favorites);

  constructor() {}

  getFavorites() {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(hotel: Hotel) {
    if (!this.favorites.find(f => f._id === hotel._id)) { // Fixed typo: i.item._id -> f._id
      this.favorites.push(hotel);
      this.updateFavorites();
    }
  }

  removeFromFavorites(id: string) {
    this.favorites = this.favorites.filter(item => item._id !== id);
    this.updateFavorites();
  }

  isInFavorites(id: string): boolean {
    return this.favorites.some(item => item._id === id);
  }

  private updateFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next([...this.favorites]);
  }
}