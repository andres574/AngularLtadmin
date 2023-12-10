import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { HttpClientModule } from '@angular/common/http'; 
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { PedidosComponent } from './pedidos/pedidos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { VerPedidoComponent } from './ver-pedido/ver-pedido.component';
import { DenegadoComponent } from './denegado/denegado.component';
defineLocale('es', esLocale);






@NgModule({
  declarations: [DashboardComponent,UsuariosComponent,ProductosComponent, PedidosComponent, VerPedidoComponent, DenegadoComponent],
  exports: [DashboardComponent,UsuariosComponent,ProductosComponent],
  imports: [
    CommonModule,
    HttpClientModule,  
    DataTablesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule, 
    

  ],
  providers: [DatePipe],
})
export class PagesModule {
  constructor() {
  }
 }
