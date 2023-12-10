import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit  {

  nombre:'';
  correo:'';
  admin:boolean = false;

   constructor(){

   }

   ngOnInit(): void {
     
    let dat = localStorage.getItem('datos');

    if (dat !== null) {
      let datos = JSON.parse(dat);
      this.nombre = datos['nombre'];
      this.correo = datos['correo'];  
    }
    let  rol = localStorage.getItem('roles');
    if (rol) {
       let dat = JSON.parse(rol); 
       this.admin = (dat.nombre === 'admin');

      
        
    }


    
   }

}
