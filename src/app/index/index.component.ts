import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CurrencyPipe } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';

import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppService } from '../services/app.services';
import { GLOBAL } from '../services/global.services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [AppService]
})

export class IndexComponent implements OnInit {


  public lenguaje : string;
  public lenguajeEsIngles : boolean = false;
  public menuItems;

  mostrarPagina = false;

  constructor(private _AppService : AppService ) { 
    this.fnInicializacion();
  }

  ngOnInit() {

  }

  fnLenguaje(lenguaje : string){
    try{
      this._AppService.fnLenguaje(lenguaje).then(
        (val) => {
          this.lenguaje = String(val);
          if(this.lenguaje == "EN"){
            this.lenguajeEsIngles = true;
          }else{
            this.lenguajeEsIngles = false;
          }
        },
        (err) => console.error(err)
      );

    }catch(ex){
      console.log(ex)
    }
  }

  fnInicializacion(){
    try{
      //CONFIGURAMOS EL MENU
      this._AppService.fnItemsDelNavbar().then(
        (val)=>{
          this.menuItems = val;
        },
        (err) => console.error(err)
      );
      //CONFIGURAMOS EL LENGUAJE
      this._AppService.fnLenguaje(this.lenguaje).then(
        (val) => {
          this.lenguaje = String(val);
          if(this.lenguaje == "EN"){
            this.lenguajeEsIngles = true;
          }else{
            this.lenguajeEsIngles = false;
          }
          this.mostrarPagina = true;
        },
        (err) => console.error(err)
      );

    }catch(ex){
      console.log(ex)
    }
  }



}