import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

export const venueGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.hasToken();

  if (!isLoggedIn) {
    router.navigate(['/log-in']);
    return false;
  }

  const userInfo = authService.userInfo;
  if (userInfo && userInfo.type === 'venue') {
    return true;
  } else {
    router.navigate(['/venues']);
    return false;
  }
};
