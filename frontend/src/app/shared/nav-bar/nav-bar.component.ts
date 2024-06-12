import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  sub:Subscription;
  navbarItems = [
    {
      name: 'Venue Booking',
      link: '/',
      iconClass:"bi bi-shop"

    },
    {
      name: 'Venues',
      link: '/',
      iconClass:"bi bi-geo-alt-fill"
    },
    {
      name: 'My Bookings',
      link: '/reservation-list',
      iconClass:"bi bi-bookmark-check-fill"
    },
  ];

  constructor(private authService: AuthService, private router:Router) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.hasToken();
    this.sub = this.authService.isLoggedIn.subscribe(response => {
      this.isLoggedIn = response;
    });
  }


  logOut(){
    this.authService.logout()
    this.router.navigate(['/venues'])
  }

  logIn(){
    this.router.navigate(['/log-in'])
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
