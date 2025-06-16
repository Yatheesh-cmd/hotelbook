import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { RazorpayService } from '../../services/razorpay.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Hotel[] = [];
  total: number = 0;
  loading: boolean = false;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private razorpayService: RazorpayService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  changeNights(id: string, delta: number) {
    this.cartService.updateNights(id, delta);
    this.calculateTotal();
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.toastr.info('Item removed from cart');
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.price * (item.nights || 1), 0);
  }

  checkout() {
    if (this.cart.length === 0) {
      this.toastr.warning('Cart is empty');
      return;
    }
    this.loading = true;
    const paymentCart = this.cart.map(item => ({
      hotelId: item._id,
      name: item.name,
      price: Number(item.price),
      nights: Number(item.nights || 1),
      total: Number(item.price) * Number(item.nights || 1),
    }));

    this.apiService.initiatePayment({ items: paymentCart }).subscribe({
      next: (response) => {
        const { orderId, amount, currency, dbOrderId } = response;
        const options = {
          key: 'rzp_test_BQZeGK1Esi5rzS',
          amount,
          currency,
          order_id: orderId,
          name: 'Hotelfire',
          description: 'Hotel Booking Payment',
          handler: (response: any) => {
            this.apiService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId,
            }).subscribe({
              next: (verifyResponse) => {
                this.toastr.success('Payment successful!');
                this.cartService.clearCart();
                this.router.navigate(['/my-bookings'], { state: { order: verifyResponse.order } });
              },
              error: (error) => {
                this.toastr.error(error.message || 'Payment verification failed');
                this.loading = false;
              },
            });
          },
          prefill: {
            name: sessionStorage.getItem('user') || 'User Name',
            email: sessionStorage.getItem('email') || 'user@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#695ee1',
          },
        };

        this.razorpayService.open(options);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error.message || 'Payment initiation failed');
        if (error.message.includes('token')) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }
}
