import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: string | null = null;
  role: string | null = null;
  searchQuery: string = '';
  private userSubscription: Subscription;
  private roleSubscription: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {
    this.userSubscription = this.apiService.currentUser$.subscribe(user => {
      this.user = user;
    });
    this.roleSubscription = this.apiService.currentRole$.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    this.role = sessionStorage.getItem('role');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.roleSubscription.unsubscribe();
  }

  searchRooms() {
    this.apiService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/rooms']);
  }

  logout() {
    sessionStorage.clear();
    this.apiService.setCurrentUser(null, null);
    this.toastr.info('Logged out successfully');
    this.router.navigate(['/']);
  }
}