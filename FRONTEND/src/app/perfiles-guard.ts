import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Auth } from './services/auth/auth';

export const perfilesGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const auth = inject(Auth);

  if (route.data['roles'].includes('INVITADO')) {
    if (token) {
      auth.redireccionarPorRol();
      return false;
    }
    return true;
  }

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