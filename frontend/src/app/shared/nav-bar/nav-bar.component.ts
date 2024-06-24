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
    isLoggedIn: boolean = false;
    user?: User;
    private sub: Subscription = new Subscription();


    constructor(private authService: AuthService, private router: Router) {

    }



    ngOnInit() {
        this.sub.add(this.authService.isLoggedIn.subscribe(response => {
            this.isLoggedIn = response;
            if (response) {
                this.sub.add(this.authService.getUserInfo().subscribe(user => {
                    this.user = user;
                }));
            } else {
                this.user = null;
            }
        }));
    }


    logOut() {
        this.authService.logout()
        this.router.navigate(['/venues'])
    }

    logIn() {
        this.router.navigate(['/log-in'])
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }
}
