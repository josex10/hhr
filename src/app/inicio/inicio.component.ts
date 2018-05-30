//Librerias de angular
import { Component, OnInit } from '@angular/core';

//Servicios
import { AppService } from '../services/app.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [AppService]
})
export class InicioComponent implements OnInit {

  public isLoading : boolean = true;

  constructor() { 
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    
  }

  ngOnInit() {
    
  }

}
