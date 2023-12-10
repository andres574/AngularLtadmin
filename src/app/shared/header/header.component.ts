import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutService } from 'src/app/servicios/aut.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private auth:AutService, private router:Router){

  }

  ngOnInit(): void {
    
  }

  salir(){
    this.auth.logout();
  }
}
