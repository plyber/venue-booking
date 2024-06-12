import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure this is imported
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VenueListComponent } from './components/venues/venue-list/venue-list.component';
import { VenueCardComponent } from './components/venues/venue-card/venue-card.component';
import { VenueInfoComponent } from './components/venues/venue-info/venue-info.component';
import { ReservationFormComponent } from './components/reservations/reservation-form/reservation-form.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    VenueListComponent,
    VenueCardComponent,
    VenueInfoComponent,
    ReservationFormComponent,
    NavBarComponent,
    ReservationListComponent,
    AlertComponent,
    AuthenticationComponent,
    DashboardComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
