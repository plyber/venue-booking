import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueListComponent } from './components/venues/venue-list/venue-list.component';
import { VenueInfoComponent } from './components/venues/venue-info/venue-info.component';
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: 'venues', component: VenueListComponent },
  { path: 'venue/:id', component: VenueInfoComponent },
  { path: 'reservation-list', component: ReservationListComponent, canActivate:[authGuard]},
  { path: 'register', component: AuthenticationComponent, data: { mode: 'register' } },
  { path: 'log-in', component: AuthenticationComponent, data: { mode: 'login' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
