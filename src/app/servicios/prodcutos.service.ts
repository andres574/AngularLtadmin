import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProdcutosService {

  private baseUrl = 'http://127.0.0.1:9999';


  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto`);
  }

  obtenerOne(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto/${id}`);
  }

  crearProductos(datos:any){
    return this.http.post(`${this.baseUrl}/producto`, datos);
  }

eliminarProductos(datos:any){
    return this.http.delete(`${this.baseUrl}/producto/${datos}`);
  }

 actualizarProductos(id:any, datos:any){
    return this.http.put(`${this.baseUrl}/producto/${id}`, datos);    
    
  }




}
