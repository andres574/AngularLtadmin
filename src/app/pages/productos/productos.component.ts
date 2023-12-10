import { Component, OnInit } from '@angular/core';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import { Subject } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showModal = false;
  titulo = '';
  formProducto: FormGroup;
  id = '';



  constructor(private serProductos: ProdcutosService, private fb: FormBuilder) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        // Configura los textos en el idioma deseado
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando 0 a 0 de 0 registros',
        infoFiltered: '(filtrado de _MAX_ registros totales)',
        zeroRecords: 'No se encontraron registros coincidentes',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        }
      }
    }
    this.obtenerProducto();
    this.dtTrigger.next(null);




  }

  eliminar(id: any) {
    this.serProductos.eliminarProductos(id).subscribe(
      data => {
        this.obtenerProducto();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto eliminado",
          showConfirmButton: false,
          timer: 1500
        });

      },
      (error) => {
        console.error('Error al eliminar producto:', error);

      }
    );




  }


  obtenerProducto() {
    this.serProductos.obtenerProductos().subscribe(
      data => {
        this.productos = data;
        console.log(this.productos);
this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Error al obtener productos:', error);

      }
    );
  }
  actualizar(id: any) {
    this.id = id;
    this.showModal = true;
    this.titulo = 'Actualizar Producto';
    this.serProductos.obtenerOne(id).subscribe(data => {
      let one = data;
      this.formProducto.patchValue({
        nombre: one.nombre,
        categoria: one.categoria,
        precio: one.precio

      })
    },
      error => {
        console.log('error ', error);

      })



  }


  cerrarModal() {
    this.showModal = false;
    this.id = '';
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    if (this.formProducto.valid) {
      if (this.id == '') {
        this.serProductos.crearProductos( this.formProducto.value).subscribe(data=>{      
          this.dtTrigger.unsubscribe();  
       this.obtenerProducto();
     

       this.showModal = false;
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Creado",
        showConfirmButton: false,
        timer: 1500
      });

        })
      } else {
        //actualiza
        let model = this.formProducto.value;
        model._id = this.id;
        this.serProductos.actualizarProductos(this.id, model).subscribe(data => {
          this.dtTrigger.unsubscribe();

          this.obtenerProducto();
          this.showModal = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto Actualizado",
            showConfirmButton: false,
            timer: 1500
          });


        })



      }
    }
  }

  nuevo(){
    this.id='';
    this.showModal = true;
    this.titulo = 'Agregar nuevo Producto';
    this.formProducto.patchValue({
      nombre: '',
      categoria: '',
      precio:''

    })
    
  }



}
