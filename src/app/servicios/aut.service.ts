import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutService {

  private isAuthenticated: boolean = false;
  private localStorageKey = 'isAuthenticated';
  private baseUrl7777 = 'http://127.0.0.1:7777';
  private baseUrl8080 = 'http://127.0.0.1:8080';



  constructor(private router: Router, private http: HttpClient) {
    // Recuperar el estado de autenticación al inicializar el servicio
    this.isAuthenticated = JSON.parse(localStorage.getItem(this.localStorageKey) || 'false');
  }

  // Método para obtener el estado de autenticación
  public isAuthenticatede(): boolean {
    return this.isAuthenticated;
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<number> {
    let model = {
      correo: email,
      contrasena: password
    };
  
    return new Observable<number>((observer) => {
  
      this.accesoLogin(model).subscribe((data: any) => {               
        // Verificar si el usuario tiene rol
        this.getRoles(data['user_id']).subscribe((roles: any) => {               
          if (roles.rol == null) {
            observer.next(2); // El usuario no tiene rol
          } else {
            let rolesString = JSON.stringify(roles.rol);
            let dat = {
              correo: roles['correo'],
              nombre: roles['seudonimo']    
            }
           
            let datos = JSON.stringify(dat);
            localStorage.setItem('datos', datos);
            localStorage.setItem('roles', rolesString);


          this.isAuthenticated = true;
           localStorage.setItem(this.localStorageKey, 'true');
            observer.next(1); // El usuario tiene rol
          }

          observer.complete();
        }, (error) => {
          console.error('Error al verificar roles:', error);
          observer.next(0); // Notifica al observador que hubo un error al verificar roles
          observer.complete();
        });
      }, (error) => {
        console.error('Error en la suscripción:', error);
        observer.next(0); // Notifica al observador que hubo un error
        observer.complete();
      });
    });
  }
   

  // Método para cerrar sesión
  public logout(): void {
  
    this.isAuthenticated = false;
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem('roles');
    localStorage.removeItem('datos');
    this.router.navigate(['/login']);

  }

  accesoLogin(model: any): Observable<any> {

    return this.http.post(`${this.baseUrl7777}/login`, model).pipe(
      map((response: any) => {

        return response;
      })
    );
  }

  getRoles(user_id: any): Observable<any> {
    return this.http.get(`${this.baseUrl8080}/usuarios/${user_id}`);
  }
}

