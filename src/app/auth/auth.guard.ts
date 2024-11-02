import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loginDashboard = authService.isAuthenticated;
  if (loginDashboard) {
    return true;
  } else {
    router.navigate(['admin']);
    return false;
  }
};
