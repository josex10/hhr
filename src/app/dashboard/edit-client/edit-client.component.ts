import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



//Servicios
import { AppService } from '../../services/app.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  @ViewChild('addClientFrm') public addClientFrm;
  @ViewChild('successModal') public successModal;
  @ViewChild('dangerModal') public dangerModal;
  public savingMessage : string;
  public showSpinner : boolean;

  public cliendEmailReceived : string;
  public clientId : string;

  constructor(private _AppService : AppService, private router: Router, route: ActivatedRoute,) { 
    this.savingMessage = "";
    this.cliendEmailReceived = route.snapshot.params['email'];
  }

  ngOnInit() {
    this.fnCheckClientEmail();
    this.fnGetClient();
  }

  fnCheckClientEmail(){
    if(!this.cliendEmailReceived){
      this.router.navigate(['dashboard/listClients']);
    }
  }

  fnGetClient(){
    try{
      this.showSpinner = true;
      var userLogged = this._AppService.solicitarUsuarioEnLocalStorage();
      this._AppService.fnGetClient( this.cliendEmailReceived, userLogged.token)
        .map(data => {
          console.log(data);
          this.addClientFrm.controls['name'].setValue(data.client.name);
          this.addClientFrm.controls['surname'].setValue(data.client.surname);
          this.addClientFrm.controls['company'].setValue(data.client.company);
          this.addClientFrm.controls['position'].setValue(data.client.position);
          this.addClientFrm.controls['phone'].setValue(data.client.phone);
          this.addClientFrm.controls['celphone'].setValue(data.client.celphone);
          this.addClientFrm.controls['email'].setValue(data.client.email);
          this.addClientFrm.controls['alternativeEmail'].setValue(data.client.alternativeEmail);
          this.addClientFrm.controls['notes'].setValue(data.client.notes);
          this.clientId = data.client._id;
          this.showSpinner = false;
        })
        .toPromise()
        .catch(err => {
          var obj = JSON.parse(err._body);
          console.log(obj.message);
          if(!obj.message){
            this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
          }else{
            this.savingMessage = obj.message;
          }
          if(obj.message == "Sin autorizacion."){
            this._AppService.fnCerrarSesion();
            this.router.navigate(['']);
          }
          this.dangerModal.show();
          this.showSpinner = false;
        });

    }catch(ex){
      this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
      this.dangerModal.show();
      this.showSpinner = false;
    }
  }

  fnSaveClient(f : NgForm){
    try{
      this.showSpinner = true;

        var userLogged = this._AppService.solicitarUsuarioEnLocalStorage();

        this._AppService.fnUpdateClient( this.clientId,  f.value.name, f.value.surname, f.value.company, f.value.position, f.value.phone, 
                                      f.value.celphone, f.value.email, f.value.alternativeEmail, f.value.notes, userLogged.token)
        .map(data => {
            this.savingMessage = data.message;
            this.successModal.show();
            this.showSpinner = false;
        })
        .toPromise()
        .catch(err => {
            var obj = JSON.parse(err._body);
            console.log(obj.message);
            if(!obj.message){
              this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
            }else{
              this.savingMessage = obj.message;
            }
            if(obj.message == "Sin autorizacion."){
              this._AppService.fnCerrarSesion();
              this.router.navigate(['']);
            }
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
