import { Component } from '@angular/core';
import { AutService } from './servicios/aut.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'adminlte';

  constructor(public authService: AutService){

  }
}
