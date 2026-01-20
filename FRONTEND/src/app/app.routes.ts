import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { RegistroCiudadano } from './components/registro-ciudadano/registro-ciudadano';

export const routes: Routes = [
    { path : 'login', component: Login },
    { path : 'registro', component: RegistroCiudadano },
    { path : '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login'}
];
