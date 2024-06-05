import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure this is imported
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VenueListComponent } from './components/venues/venue-list/venue-list.component';
import { VenueCardComponent } from './components/venues/venue-card/venue-card.component';
import { VenueInfoComponent } from './components/venues/venue-info/venue-info.component';

@NgModule({
  declarations: [
    AppComponent,
    VenueListComponent,
    VenueCardComponent,
    VenueInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
