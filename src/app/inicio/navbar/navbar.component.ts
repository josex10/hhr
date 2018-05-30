//Librerias de Angular
import { Component, OnInit } from '@angular/core';

//Servicios
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private lenguaje: string;
  
  constructor(private _AppService : AppService) {
    this.fnInicializarLenguaje();
  }

  ngOnInit() {
    this.fnObtenerLenguaje();
  }

  fnObtenerLenguaje():void{
    this.lenguaje = this._AppService.lenguaje;
  }

  fnInicializarLenguaje():void{
    this._AppService.fnInicializarLenguaje();
  }

  fnCambiarLenguaje(nuevoLenguaje : string) : void{
    this._AppService.fnCambiarLenaguaje(nuevoLenguaje);
  }

}
