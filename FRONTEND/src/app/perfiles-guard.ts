import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const perfilesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const userRol = decoded.rol;

    const requiredRol = route.data['roles'] ? route.data['roles'][0] : null;

    if (requiredRol && userRol != requiredRol) {
      router.navigate(['/login']); 
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};