import { Component, OnInit } from '@angular/core';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import { Subject } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  empleados: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showModal = false;
  showModal2 = false;

  titulo = '';
  formProducto: FormGroup;
  idRol = '';
  idUser= '';

  id = '';

  roles: any = [];




  constructor(private serempleados: UsuariosService, private fb: FormBuilder) {
    this.formProducto = this.fb.group({
      seudonimo: [null, [Validators.required]],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
     
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
    this.obtenerempleados();
    this.dtTrigger.next(null);

    this.obtenerRoles();
 




  }

  eliminar(id: any) {
    this.serempleados.eliminarEmpleado(id).subscribe(
      data => {
        this.obtenerempleados();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Empleado Eliminado",
          showConfirmButton: false,
          timer: 1500
        });

      },
      (error) => {
        console.error('Error al eliminar producto:', error);

      }
    );




  }


  obtenerempleados() {

    this.serempleados.obtenerEmpleado().subscribe(
      data => {
     
        this.empleados = data;
        this.dtTrigger.next(null);

      },
      (error) => {
        console.error('Error al obtener Empleado:', error);

      }
    );
  }
  actualizar(id: any) {
    this.id = id;
    this.showModal = true;
    this.titulo = 'Actualizar Empleado';
    this.serempleados.obtenerOne(id).subscribe(data => {
      let one = data;
      this.formProducto.patchValue({
        seudonimo: one.seudonimo,
        correo: one.correo,
        contrasena: ''
       
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

  cerrarModal2() {
    this.showModal2 = false;
    this.idRol = '';
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    if (this.formProducto.valid) {
      if (this.id == '') {
        this.serempleados.crearEmpleado( this.formProducto.value).subscribe(data=>{ 
          this.dtTrigger.unsubscribe();  

       this.obtenerempleados();
       this.showModal = false;
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Empleado Creado",
        showConfirmButton: false,
        timer: 1500
      });

        })
      } else {
        //actualiza
        let model = this.formProducto.value;
        model._id = this.id;
        this.serempleados.actualizarEmpleado(this.id, model).subscribe(data => {
          this.dtTrigger.unsubscribe();  

          this.obtenerempleados();
          this.showModal = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Empleado Actualizado",
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
    this.titulo = 'Agregar nuevo empleado';
    this.formProducto.patchValue({
      seudonimo: "",
      correo: "",
      contrasena: ''
     
    })
    
  }

  obtenerRoles() {
    this.serempleados.obtenerRoles().subscribe(
      data => {
        this.roles = data;

      },
      (error) => {
        console.error('Error al obtener roles:', error);

      }
    );
  }
  rolUpdate(id:any){
    this.showModal2 = true;
    this.idUser = id;

  }

  onSelectChange(event: any) {
    // Maneja el cambio de selección y almacena el ID seleccionado
    this.idRol = event.target.value;
    
  }

  onSubmitRol() {
   

    this.serempleados.actualizarRol( this.idUser,this.idRol).subscribe(data=>{ 
      this.dtTrigger.unsubscribe();  

      this.obtenerempleados();
      this.showModal2 = false;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Rol de Empleado actualizado",
        showConfirmButton: false,
        timer: 1500
      });

       })
 
  }



}
