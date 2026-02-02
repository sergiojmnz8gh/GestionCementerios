import { Routes } from '@angular/router';
import { Admin } from './pages/admin/admin';
import { Ayuntamiento } from './pages/ayuntamiento/ayuntamiento';
import { MisCementerios } from './pages/ayuntamiento/components/mis-cementerios/mis-cementerios';
import { Ciudadano } from './pages/ciudadano/ciudadano';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { RegistroCiudadano } from './pages/registro-ciudadano/registro-ciudadano';
import { perfilesGuard } from './perfiles-guard';

export const routes: Routes = [
    { path : 'inicio', component: Landing},
    { path : 'login', component: Login, canActivate: [perfilesGuard], data:{roles: ['INVITADO']}},
    { path : 'registro', component: RegistroCiudadano, canActivate: [perfilesGuard], data:{roles: ['INVITADO']}},
    { path : 'admin', component: Admin, canActivate: [perfilesGuard], data:{roles: ['ADMIN']}},
    { path : 'ciudadano', component: Ciudadano, canActivate: [perfilesGuard], data:{roles: ['CIUDADANO']}},
    { path : 'ciudadano/editar-perfil', component: Ciudadano, canActivate: [perfilesGuard], data:{roles: ['CIUDADANO'], vista:"editar-perfil"}},
    { path : 'ayuntamiento', component: Ayuntamiento, canActivate: [perfilesGuard], data:{roles: ['AYUNTAMIENTO']}},
    { path : 'ayuntamiento/cementerios', component: MisCementerios, canActivate: [perfilesGuard], data:{roles: ['AYUNTAMIENTO']}},
    { path : '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: '**', redirectTo: 'inicio'}
];
