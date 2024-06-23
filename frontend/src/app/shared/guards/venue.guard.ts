import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { take } from "rxjs";
import { User } from "../models/user";

export const venueGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.hasToken();

  if (!isLoggedIn) {
    router.navigate(['/log-in']);
    return false;
  }

  const userInfo: User = await authService.user.pipe(take(1)).toPromise();
  if (userInfo && userInfo.type === 'venue') {
    return true;
  } else {
    router.navigate(['/venues']);
    return false;
  }
};
