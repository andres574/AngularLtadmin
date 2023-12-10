import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = 'http://127.0.0.1:8080';


  constructor(private http: HttpClient) {}

  obtenerEmpleado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  obtenerOne(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }

  crearEmpleado(datos:any){
    return this.http.post(`${this.baseUrl}/usuarios`, datos);
  }

eliminarEmpleado(datos:any){
    return this.http.delete(`${this.baseUrl}/usuarios/${datos}`);
  }

 actualizarEmpleado(id:any, datos:any){
    return this.http.put(`${this.baseUrl}/usuarios/${id}`, datos);    
    
  }

  obtenerRoles(){
    return this.http.get(`${this.baseUrl}/roles`);    

  }
  actualizarRol(id_user:any,id_rol:any){
    console.log(`${this.baseUrl}/usuarios/${id_user}/rol/${id_rol}`);
    

    return this.http.put(`${this.baseUrl}/usuarios/${id_user}/rol/${id_rol}`, {});

  }

}
