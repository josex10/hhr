import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


//Servicios
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('basicModal') public basicModal;
  public mensajeDeErrorEspaciosVacios : string;
  public mensajeDeErrorCorreo : string;

  public mensajeLogin : string;

  constructor(private _AppService : AppService, private router: Router) { 
    this.mensajeDeErrorEspaciosVacios = "";
    this.mensajeDeErrorCorreo = "";
    this.mensajeLogin = "";
  }

  ngOnInit() {
  }

  fnValidarEspaciosVacios(data){
    var validacion : boolean;
    if(this._AppService.fnElCampoEstaVacio(data.value)){
      this.mensajeDeErrorEspaciosVacios = "*Campo obligatorio";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarCorreo(data){
    var validacion : boolean;
    if(!this._AppService.fnFormatoDeCorreoCorrecto(data.value)){
      this.mensajeDeErrorCorreo = "*Correo incorrecto";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarEspaciosVaciosString(data){
    var validacion : boolean;
    if(this._AppService.fnElCampoEstaVacio(data)){
      this.mensajeDeErrorEspaciosVacios = "*Campo obligatorio";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnValidarCorreoString(data){
    var validacion : boolean;
    if(!this._AppService.fnFormatoDeCorreoCorrecto(data)){
      this.mensajeDeErrorCorreo = "*Correo incorrecto";
      validacion = true;
    }else{
      validacion = false;
    }
    return validacion;
  }

  fnLogin(f : NgForm){
    this.mensajeLogin = "Cargando...";

    this._AppService.fnLogin(f.value.frmEmail, f.value.frmPassword)
      .map(data => {
          this._AppService.agregarUsuarioEnLocalStorage(data.email, data.token);
          f.resetForm();
          this.basicModal.hide();
          this.router.navigate(['/dashboard']);
        })
        .toPromise()
        .catch(err => {
          console.log(err._body);
          var obj = JSON.parse(err._body);
          console.log(obj.message);
          this.mensajeLogin = obj.message;
      });

  }

}
