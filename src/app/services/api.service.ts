import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hotel } from '../models/hotel.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private searchQuery = new BehaviorSubject<string>('');
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(sessionStorage.getItem('user'));
  private currentRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(sessionStorage.getItem('role'));

  constructor(private http: HttpClient) {}

  // Observables for user and role state
  public currentUser$ = this.currentUserSubject.asObservable();
  public currentRole$ = this.currentRoleSubject.asObservable();

  // Update the current user and role
  setCurrentUser(user: string | null, role: string | null) {
    this.currentUserSubject.next(user);
    this.currentRoleSubject.next(role);
    if (user && role) {
      sessionStorage.setItem('user', user);
      sessionStorage.setItem('role', role);
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('role');
    }
  }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable();
  }

  // User Authentication
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Login failed')))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Registration failed')))
    );
  }

  // Hotel Management
  sampleHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotels/sample`).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch sample hotels')))
    );
  }

  getAllHotels(search: string = ''): Observable<Hotel[]> {
    const url = search ? `${this.baseUrl}/hotels?search=${encodeURIComponent(search)}` : `${this.baseUrl}/hotels`;
    return this.http.get<Hotel[]>(url, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch hotels')))
    );
  }

  getHotelById(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/hotels/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch hotel details')))
    );
  }

  addHotel(hotel: Hotel): Observable<any> {
    return this.http.post(`${this.baseUrl}/hotels`, hotel, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to add hotel')))
    );
  }

  updateHotel(id: string, hotel: Hotel): Observable<any> {
    return this.http.put(`${this.baseUrl}/hotels/${id}`, hotel, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to update hotel')))
    );
  }

  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/hotels/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to delete hotel')))
    );
  }

  // Booking Management
  getUserBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bookings`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch user bookings')))
    );
  }

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bookings/all`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch all bookings')))
    );
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/bookings/${bookingId}/status`, { status }, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to update booking status')))
    );
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bookings/${bookingId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to delete booking')))
    );
  }

  // Payment Management
  initiatePayment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/initiate`, data, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to initiate payment')))
    );
  }

  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/verify`, data, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to verify payment')))
    );
  }

  // Review Management
  createReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reviews`, data, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to create review')))
    );
  }

  getBookingReviews(bookingId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews/booking/${bookingId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch booking reviews')))
    );
  }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to fetch all reviews')))
    );
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reviews/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to delete review')))
    );
  }
}