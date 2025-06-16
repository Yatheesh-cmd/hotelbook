import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxRazorpayModule } from 'ngx-razorpay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { WatchComponent } from './pages/watch/watch.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HotelCardComponent,
    CartComponent,
    FavoritesComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RoomsComponent,
    HotelDetailsComponent,
    MyBookingsComponent,
    CheckoutComponent,
    WatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxRazorpayModule,
    SharedModule,
    AdminModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}