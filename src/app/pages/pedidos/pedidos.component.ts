import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


defineLocale('es', esLocale);
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showModal = false;
  titulo = '';
  formPedido: FormGroup;
  id = '';
  minDate: string;


  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private serPedido: PedidoService, private fb: FormBuilder,private localeService: BsLocaleService,private datePipe: DatePipe,private router: Router) {
    this.formPedido = this.fb.group({
      fecha: [new Date(), Validators.required],
      estado: ['', Validators.required],
      observaciones:['', Validators.required],
    });
    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY'
    };
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.localeService.use('es');
   
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
    this.obtenerPedido();
   




  }

  eliminar(id: any) {
    this.serPedido.eliminarPedido(id).subscribe(
      data => {
        this.dtTrigger.unsubscribe();
        this.obtenerPedido();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Pedido eliminado",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error al eliminar pedido:', error);

      }
    );




  }


  obtenerPedido() {
    this.serPedido.obtenerPedido().subscribe(
      data => {
        this.pedidos = data;
        console.log(this.pedidos);
        
  this.dtTrigger.next(null);
      },
      (error:any) => {
        console.error('Error al obtener pedido:', error);

      }
    );
  }
  actualizar(id: any) {
    this.id = id;
    this.showModal = true;
    this.titulo = 'Actualizar pedido';
    this.serPedido.obtenerOne(id).subscribe(data => {
      let one = data;
      this.formPedido.patchValue({
        estado: one.estado,
        fecha: one.fecha,
        observaciones: one.observaciones

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
    if (this.formPedido.valid) {
      
      let fecha = this.datePipe.transform( this.formPedido.get('fecha')?.value, 'dd/MM/yyyy');      
      if (this.id == '') {
        
        let model = {
          estado: this.formPedido.get('estado')?.value,
          fecha:fecha,
          observaciones: this.formPedido.get('observaciones')?.value,

        }

        this.serPedido.crearPedido(model).subscribe(data=>{     
          this.dtTrigger.unsubscribe();
   
       this.obtenerPedido();
       this.showModal = false;

       Swal.fire({
        position: "center",
        icon: "success",
        title: "Pedido Creado",
        showConfirmButton: false,
        timer: 1500
      });

        })
      } else {
        //actualiza
    
        let model = {
          estado: this.formPedido.get('estado')?.value,
          fecha:fecha,
          observaciones: this.formPedido.get('observaciones')?.value,
          _id:  this.id
        }
        
        
        this.serPedido.actualizarPedido(this.id, model).subscribe(data => {
          this.dtTrigger.unsubscribe();

          this.obtenerPedido();
          this.showModal = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pedido Actualizado",
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
    this.titulo = 'Agregar nuevo Pedido';
      this.formPedido.patchValue({
      estado: '',
      fecha:'',
      observaciones:''
    });

    
    
  }

  verPedido(id:any){
    this.router.navigate(['app/verPedidos', id]);

  }

}
