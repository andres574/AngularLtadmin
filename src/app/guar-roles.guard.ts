
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class guarRolesGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let  rol = localStorage.getItem('roles');

    if (rol) {
      let userData = JSON.parse(rol);     
      
      if(userData.nombre =='admin'){
        return true
      }else{
        this.router.navigate(['/app/acceso']);
        return false;
      }
      
    } else {
      this.router.navigate(['/app/acceso']);
      return false;
    }



    // return this.authService.getRoles().pipe(
    //   map(roles => roles.includes('admin') 
    //   || this.router.createUrlTree(['/access-denied']))
    // );
  }
}