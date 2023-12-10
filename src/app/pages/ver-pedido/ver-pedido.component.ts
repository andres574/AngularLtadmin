import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PedidoProductoService } from 'src/app/servicios/pedido-producto.service';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent implements OnInit {
   id: string|null ;
   productos:any[];
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject<any>();
   titulo= '';
   showModal= false;
   formPeProducto: FormGroup;
   idProducto: '';
   productosPedido: any[];
   campoProductos:boolean = false;
   idProductoPedido:'';
   totalCompra = '';




  constructor(private route: ActivatedRoute,private serProductos:ProdcutosService, private productoPed:PedidoProductoService, private fb: FormBuilder) {
    this.formPeProducto = this.fb.group({
      cantidad: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descripcion: ['', Validators.required]
    });
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    console.log(this.id);
    this.obtenerProducto();
    this.obtenerPedidos();


    
  }


  nuevo(){
    this.campoProductos = true;
    this.showModal = true;
    this.titulo = 'Agregar nuevo Producto al pedido';
    this.idProducto = '';
    this.idProductoPedido= '';
    this.formPeProducto.patchValue({
      cantidad: '',
      descripcion:'',   
    })
  

 
    
  }

  obtenerProducto() {
    this.serProductos.obtenerProductos().subscribe(
      data => {
        this.productos = data;

      },
      (error) => {
        console.error('Error al obtener productos:', error);

      }
    );
  }

  obtenerPedidos() {
    this.productoPed.obtenerPedido().subscribe(
      data => {
      let fil = data.filter((ob:any)=> ob.pedido._id=== this.id)

      fil.forEach((el:any) => {
        let cantidad  = parseInt(el.cantidad,10);
        let precio = el.producto.precio;

        if(!isNaN(cantidad)){
          el.totalP = cantidad*precio;
        }else{
          el.totalP = precio
        }        
      });
this.productosPedido = fil;      



this.totalCompra = this.productosPedido.reduce((acumulador, objeto) => acumulador + objeto.totalP, 0);



      },
      (error) => {
        console.error('Error al obtener pedidos productos:', error);

      }
    );
  }

  
  cerrarModal() {
    this.showModal = false;
    
  }

  onSubmit(){
    if(this.idProducto != '' && this.idProductoPedido != ''){
      this.productoPed.actualizarPedido(this.formPeProducto.value, this.idProductoPedido,this.idProducto,this.id).subscribe(data=>{
        console.log(data);
        this.obtenerPedidos();  
        this.showModal = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto Actualizado del pedido",
          showConfirmButton: false,
          timer: 1500
        });
       })

    }else{
      this.productoPed.crearPedido(this.formPeProducto.value,this.idProducto, this.id).subscribe(data=>{
        console.log(data);
        this.obtenerPedidos();  
        this.showModal = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto Agregado del pedido",
          showConfirmButton: false,
          timer: 1500
        });
       })

    }
    
 
    
  }

  onSelectChange(event: any) {
    // Maneja el cambio de selección y almacena el ID seleccionado
    this.idProducto = event.target.value;
    console.log(this.idProducto);
    
  }



  eliminar(id: any) {
    this.productoPed.eliminarPedidoPro(id).subscribe(
      (data:any) => {
        // this.dtTrigger.unsubscribe();
        this.obtenerPedidos();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto eliminado del pedido",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error:any) => {
        console.error('Error al eliminar pedido:', error);

      }
    );
  }

  actualizar(idProductoPedido:any, idProducto:any,idPedido:any){
    this.campoProductos = false;
    this.showModal = true;
    this.titulo = 'Editar Producto al pedido';
    this.idProducto =idProducto;
    this.idProductoPedido= idProductoPedido;

    this.productoPed.obtenerOne(idProductoPedido).subscribe(data => {
      let one = data;
      
      this.formPeProducto.patchValue({
        cantidad: one.cantidad,
        descripcion: one.descripcion,   
      })
    },
      error => {
        console.log('error ', error);

      })



  }

}
