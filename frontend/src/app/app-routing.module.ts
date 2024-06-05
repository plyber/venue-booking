import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueListComponent } from "./components/venues/venue-list/venue-list.component";
import { VenueInfoComponent } from "./components/venues/venue-info/venue-info.component";

const routes: Routes = [
  {path: '', redirectTo: '/venues', pathMatch: 'full'},
  {path: 'venues', component: VenueListComponent},
  {path: 'venue/:id', component: VenueInfoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
