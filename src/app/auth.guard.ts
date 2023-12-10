import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutService } from './servicios/aut.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AutService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (this.authService.isAuthenticatede()) {
      console.log('Usuario autenticado. Permitiendo acceso.');
    
      return true;
    } else {
      console.log('Usuario no autenticado. Redirigiendo a /login.');
     
      return false;
    }
  }
  
}