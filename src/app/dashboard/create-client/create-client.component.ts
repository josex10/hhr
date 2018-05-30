import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



//Servicios
import { AppService } from '../../services/app.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  @ViewChild('successModal') public successModal;
  @ViewChild('dangerModal') public dangerModal;
  public savingMessage : string;
  public showSpinner : boolean;

  constructor(private _AppService : AppService, private router: Router) { 
    this.savingMessage = "";
    this.showSpinner = false;
  }

  ngOnInit() {
  }

  fnSaveClient(f : NgForm){
    try{
      this.showSpinner = true;

        var userLogged = this._AppService.solicitarUsuarioEnLocalStorage();

        this._AppService.fnAddClient( f.value.name, f.value.surname, f.value.company, f.value.position, f.value.phone, 
                                      f.value.celphone, f.value.email, f.value.alternativeEmail, f.value.notes, userLogged.token)
        .map(data => {
            this.savingMessage = data.message;
            this.successModal.show();
            f.resetForm();
            this.showSpinner = false;
        })
        .toPromise()
        .catch(err => {
            var obj = JSON.parse(err._body);
            console.log(obj.message);
            if(!obj.message){
              this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
            }
            if(obj.message == "Sin autorizacion."){
              this._AppService.fnCerrarSesion();
              this.router.navigate(['']);
            }
            this.savingMessage = obj.message;
            this.dangerModal.show();
            this.showSpinner = false;
        });
    }catch(ex){
      console.log(ex);
      this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
      this.showSpinner = false;
    }
  }

}
