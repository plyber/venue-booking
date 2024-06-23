import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/user';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardMode: 'edit' | 'view' | 'changePassword' = 'view';
  responseMessage: string;
  protected user?: User | null;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.sub.add(this.authService.user.subscribe(data => {
      this.user = data;
    }));
  }

  changePassword() {
    console.log(this.dashboardMode);
    this.responseMessage = 'Password changed successfully.'
    setTimeout(() => {
      this.responseMessage = null;
    }, 1000)
  }

  saveInfo() {
    console.log();
    this.dashboardMode = 'view';
    if (this.user) {
      this.authService.saveUser({
        password: this.user.password,
        type: this.user.type,
        username: this.user.username,
        userId: this.user.userId,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      }).subscribe(() => {
        this.responseMessage = 'User information saved successfully.';
        setTimeout(() => {
          this.responseMessage = null;
        }, 1000);
      }, error => {
        this.responseMessage = 'Error saving user information.';
        setTimeout(() => {
          this.responseMessage = null;
        }, 1000);
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
