import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from "../models/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  protected user?: User;
  private sub:Subscription = new Subscription();
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
    {
      name: 'My Venues',
      link: '/my-venues',
      iconClass:"bi bi-star-fill"
    },
  ];

  constructor(private authService: AuthService, private router:Router) {
    this.sub.add(this.authService.getUserInfo().subscribe(response => {
      this.user = response.user;
    }));
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.hasToken();
    this.sub.add(this.authService.isLoggedIn.subscribe(response => {
      this.isLoggedIn = response;
    }));
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
