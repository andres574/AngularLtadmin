import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutService } from 'src/app/servicios/aut.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit   {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;



constructor(private fb: FormBuilder,private auth:AutService,private router:Router) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}


ngOnInit(): void {}



login(): void {
 this.email = this.loginForm.get('email')?.value;
 this.password = this.loginForm.get('password')?.value;
   this.auth.login(this.email, this.password).subscribe(
    (loginExitoso: number) => {
      
      if (loginExitoso ==1) {
     console.log('entro');
     
      }else if(loginExitoso ==2){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario sin rol. comuniquese con el administrador",
         
        });

      }
        else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al iniciar sesion, Usuario o contraseña incorrecta",
         
        });
        
      }
    }
  );
  




}
  
}
  



