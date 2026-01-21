import { Routes } from '@angular/router';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { RegistroCiudadano } from './pages/registro-ciudadano/registro-ciudadano';
import { perfilesGuard } from './perfiles-guard';

export const routes: Routes = [
    { path : 'login', component: Login },
    { path : 'registro', component: RegistroCiudadano },
    { path : 'admin', component: Admin, canActivate: [perfilesGuard], data:{roles: ['ADMIN']}},
    { path : '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login'}
];
