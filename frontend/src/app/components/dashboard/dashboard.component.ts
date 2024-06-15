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
  protected user?: User;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    this.sub.add(this.authService.getUserInfo().subscribe(response => {
      this.user = response.user;
    }));
  }

  ngOnInit() {

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
    this.authService.saveUser({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
    }).subscribe(response => {
      this.responseMessage = response.message;
      setTimeout(() => {
        this.responseMessage = null;
      }, 1000)
      this.router.navigate(['/dashboard']).then(()=>{
        window.location.reload()
      })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
