import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {

  private baseUrl = 'http://127.0.0.1:9999';


  constructor(private http: HttpClient) {}

  obtenerPedido(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedidoProducto`);
  }

  obtenerOne(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedidoProducto/${id}`);
  }

  crearPedido(datos:any,idProducto:any,idPedido:any){
    console.log(`${this.baseUrl}/pedidoProducto/producto/${idProducto}/pedido/${idPedido}`);
    
    return this.http.post(`${this.baseUrl}/pedidoProducto/producto/${idProducto}/pedido/${idPedido}`, datos);
  }

eliminarPedidoPro(datos:any){
    return this.http.delete(`${this.baseUrl}/pedidoProducto/${datos}`);
  }

 actualizarPedido( datos:any,idPedidoProducto:any,idProducto:any,idPedido:any){
  console.log(`${this.baseUrl}/pedidoProducto/${idPedidoProducto}/producto/${idProducto}/pedido/${idPedido}`);
  
    return this.http.put(`${this.baseUrl}/pedidoProducto/${idPedidoProducto}/producto/${idProducto}/pedido/${idPedido}`, datos);    
    
  }

}
