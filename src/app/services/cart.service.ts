import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Hotel[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<Hotel[]>(this.cart);

  constructor() {}

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(hotel: Hotel) {
    const existing = this.cart.find(item => item._id === hotel._id);
    if (existing) {
      existing.nights = (existing.nights || 1) + (hotel.nights || 1);
    } else {
      this.cart.push({ ...hotel, nights: hotel.nights || 1 });
    }
    this.updateCart();
  }

  updateNights(id: string, delta: number) {
    const item = this.cart.find(item => item._id === id);
    if (item) {
      item.nights = Math.max(1, (item.nights || 1) + delta);
      this.updateCart();
    }
  }

  removeFromCart(id: string) {
    this.cart = this.cart.filter(item => item._id !== id);
    this.updateCart();
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next([...this.cart]);
  }
}
