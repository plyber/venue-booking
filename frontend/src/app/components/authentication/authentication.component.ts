import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from '../../shared/models/Credentials.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  credentials: Credentials = { username: '', password: '', accountType: null };
  responseMessage = '';
  protected mode: 'register' | 'login';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
    });
  }

  submit() {
    if (this.mode) {
      switch (this.mode) {
        case 'login': {
          this.authService.login(this.credentials).subscribe({
            next: (message) => {
              this.responseMessage = message.message
              setTimeout(() => {
                this.router.navigate(['/venues']);
              }, 1000);
            },
            error: (error) => {
              this.responseMessage = error.message
              console.error(error);
            }
          });
          break;
        }
        case 'register': {
          this.authService.register(this.credentials).subscribe({
            next: (message) => {
              this.responseMessage = message.message
              setTimeout(() => {
                this.router.navigate(['/venues']);
              }, 1000);
            },
            error: (error) => {
              this.responseMessage = error.message || 'Registration failed';
              console.error(error);
            }
          });
          break;
        }
        default: {
          this.responseMessage = 'Error fetching form info';
        }
      }
    }
  }
}
