import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token) {
      this.toastr.warning('Please log in to access this page');
      this.router.navigate(['/login']);
      return false;
    }

    if (role !== 'admin') {
      this.toastr.error('Access denied: Admins only');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}