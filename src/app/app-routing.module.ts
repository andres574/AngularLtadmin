import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AuthGuard } from './auth.guard';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { VerPedidoComponent } from './pages/ver-pedido/ver-pedido.component';
import { guarRolesGuard } from './guar-roles.guard';
import { DenegadoComponent } from './pages/denegado/denegado.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [guarRolesGuard] },
      { path: 'productos', component: ProductosComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'acceso', component: DenegadoComponent },
      { path: 'verPedidos/:id', component: VerPedidoComponent},
      { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/app/dashboard', pathMatch: 'full' },
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
