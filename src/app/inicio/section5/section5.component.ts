import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';

//Servicios
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component implements OnInit {

  @ViewChild('infoModal') public infoModal;

  public mensajeDeErrorEspaciosVacios : string;
  public mensajeDeErrorCorreo : string;

  public modalMensajeEnviadoEN : string;
  public modalMensajeEnviadoES : string;

  public modalMensajeEnviadoErrorEN : string;
  public modalMensajeEnviadoErrorES : string;

  public stadoCargado : boolean;
  public stadoError  : boolean;
  public stadoEnviado  : boolean;
  public stadoEnviadoError : boolean;
  
  constructor(private _AppService : AppService ) { 
    this.mensajeDeErrorEspaciosVacios = "";
    this.mensajeDeErrorCorreo = "";
  }

  ngOnInit() {
  }

  fnValidarEspaciosVacios(data){
    var validacion : boolean;
    if(this._AppService.fnElCampoEstaVacio(data.value)){
      this.mensajeDeErrorEspaciosVacios = "*Campo obligatorio / Required";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarCorreo(data){
    var validacion : boolean;
    if(!this._AppService.fnFormatoDeCorreoCorrecto(data.value)){
      this.mensajeDeErrorCorreo = "*Correo incorrecto / Incorrect email";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarEspaciosVaciosString(data){
    var validacion : boolean;
    if(this._AppService.fnElCampoEstaVacio(data)){
      this.mensajeDeErrorEspaciosVacios = "*Campo obligatorio / Required";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarCorreoString(data){
    var validacion : boolean;
    if(!this._AppService.fnFormatoDeCorreoCorrecto(data)){
      this.mensajeDeErrorCorreo = "*Correo incorrecto / Incorrect email";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnEnviarCorreo(f : NgForm){
    console.log(f);
    //Paso 1: Mostrar el modal y  mensaje de enviando
    this.infoModal.show();
    this.stadoCargado = true;
    this._AppService.fnSendEmail(f.value.frmName, f.value.frmPhone, f.value.frmEmail, f.value.frmMessage)
      .map(data => {
          console.log(data);
          this.stadoCargado = false;
          this.stadoEnviado = true;

          this.modalMensajeEnviadoES = "El mensaje se ha enviado correctamente. Muchas gracias!";
          this.modalMensajeEnviadoEN = "The message was sent succesfully. Thank you!";
          f.resetForm();
        })
        .toPromise()
        .catch(err => {
          this.stadoCargado = false;
          this.stadoEnviadoError = true;
          this.modalMensajeEnviadoErrorES = "Ha ocurrido un error enviado el correo, favor intentar más tarde...";
          this.modalMensajeEnviadoErrorEN = "We found an error sending the email, please try again...";
          console.log(err);
      });
  }

}
