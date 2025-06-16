import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = { email: '', password: '' };
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleSubmit() {
    this.loading = true;
    this.apiService.login(this.formData).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('email', response.user.email);
        this.apiService.setCurrentUser(response.user.username, response.user.role);
        this.toastr.success('Logged in successfully');
        this.router.navigate([response.user.role === 'admin' ? '/admin/dashboard' : '/profile']);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error.message || 'Login failed');
        this.loading = false;
      },
    });
  }
}