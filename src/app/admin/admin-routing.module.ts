import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderedBookingsComponent } from './ordered-bookings/ordered-bookings.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ordered-bookings', component: OrderedBookingsComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'edit-room/:id', component: EditRoomComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}