import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://127.0.0.1:9999';


  constructor(private http: HttpClient) {}

  obtenerPedido(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedido`);
  }

  obtenerOne(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedido/${id}`);
  }

  crearPedido(datos:any){
    return this.http.post(`${this.baseUrl}/pedido`, datos);
  }

eliminarPedido(datos:any){
    return this.http.delete(`${this.baseUrl}/pedido/${datos}`);
  }

 actualizarPedido(id:any, datos:any){
    return this.http.put(`${this.baseUrl}/pedido/${id}`, datos);    
    
  }

}
