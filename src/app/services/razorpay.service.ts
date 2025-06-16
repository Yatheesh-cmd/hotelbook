import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  constructor(private winRef: WindowRefService) {}

  open(options: any) {
    const razorpay = new this.winRef.nativeWindow.Razorpay(options);
    razorpay.open();
  }
}