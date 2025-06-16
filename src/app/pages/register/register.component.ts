import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    username: '',
    email: '',
    password: '',
    role: 'user',
    address: '',
    phone: '',
  };
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleSubmit() {
    this.loading = true;
    this.apiService.register(this.formData).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.user.role);
        sessionStorage.setItem('user', response.user.username);
        sessionStorage.setItem('email', response.user.email);
        this.toastr.success('Registered successfully');
        this.router.navigate([response.user.role === 'admin' ? '/admin/dashboard' : '/profile']);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error.message || 'Registration failed');
        this.loading = false;
      },
    });
  }
}