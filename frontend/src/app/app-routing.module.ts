import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueListComponent } from './components/venues/venue-list/venue-list.component';
import { VenueInfoComponent } from './components/venues/venue-info/venue-info.component';
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { MyVenuesListComponent } from "./components/venues/my-venues-list/my-venues-list.component";
import { customerGuard } from "./shared/guards/customer.guard";
import { venueGuard } from "./shared/guards/venue.guard";
import { VenueFormComponent } from "./components/venues/venue-form/venue-form.component";

const routes: Routes = [
  { path: 'venues', component: VenueListComponent },
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: 'venue/:id', component: VenueInfoComponent },
  { path: 'register', component: AuthenticationComponent, data: { mode: 'register' } },
  { path: 'log-in', component: AuthenticationComponent, data: { mode: 'login' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'reservation-list', component: ReservationListComponent, canActivate:[customerGuard]},
  { path: 'my-venues', component: MyVenuesListComponent, canActivate:[venueGuard]},
  { path: 'create-venue', component: VenueFormComponent, canActivate:[venueGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
