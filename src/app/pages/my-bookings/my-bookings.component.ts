import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  orders: any[] = [];
  loading = false;
  selectedOrder: any = null;
  qrCodeDataUrl: string | null = null;

  @ViewChild('coupon') coupon!: ElementRef;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { order: any };
    if (state?.order) {
      this.orders = [state.order, ...this.orders];
    }
  }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.apiService.getUserBookings().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch bookings: ' + error.message);
        if (error.message.includes('token')) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
    });
  }

  async downloadCoupon(order: any) {
    this.selectedOrder = order;
    // Generate QR code
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(`https://your-site.com/verify?bookingId=${order._id}`);
    } catch (error) {
      this.toastr.error('Failed to generate QR code');
      return;
    }

    setTimeout(() => {
      const couponElement = this.coupon.nativeElement;
      html2canvas(couponElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [105, 148], // A6 size for a compact coupon
        });

        const imgWidth = 95; // Adjust to fit A6
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
        pdf.save(`coupon_${order._id}.pdf`);
      });
    }, 0); // Ensure DOM updates
  }
}