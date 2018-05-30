import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Servicios
import { AppService } from '../../services/app.services';

//pipes
import { FilterPipe }from '../../pipes/filter.pipe';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  @ViewChild('successModal') public successModal;
  @ViewChild('dangerModal') public dangerModal;
  public savingMessage : string;
  public showSpinner : boolean;
  public arregloDeClientes : any[] = [];
  public searchData : string = "";

  filterOptions: Array<any> = [
    { value : "name", label: "Nombre"},
    { value : "surname", label: "Apellido"},
    { value : "company", label: "Compañia"},
    { value : "email", label: "Correo"},
    { value : "phone", label: "Teléfono"}
  ]; 
  

  constructor(private _AppService : AppService, private router: Router) { 
    this.savingMessage = "";
    this.showSpinner = false;
  }

  ngOnInit() {

    try{
      this.showSpinner = true;
      this.savingMessage = "";

      var userLogged = this._AppService.solicitarUsuarioEnLocalStorage();

      this._AppService.fnGetAllClients(userLogged.token)
        .map(data => {
          for (let i in data.clients) {
            this.arregloDeClientes.push(
              data.clients[i]
            );
          }
          console.log(this.arregloDeClientes);
          this.showSpinner = false;
        })
        .toPromise()
        .catch(err => {

          console.log(err);
          var obj = JSON.parse(err._body);

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
      
      this.savingMessage = "Error en la aplicacion, favor intentarlo de nuevo...";
      this.dangerModal.show();
      this.showSpinner = false;
      
    }

  }

  fnDeleteClient(email){
    try{
      this.showSpinner = true;

      var userLogged = this._AppService.solicitarUsuarioEnLocalStorage();

      this._AppService.fnDeleteClient(email, userLogged.token)
        .map(data => {
          console.log(data);
          this.savingMessage = "El cliente " + email + ", se ha eliminado correctamente!";
          this.showSpinner = false;
          this.arregloDeClientes = [];
          this.ngOnInit();
          this.successModal.show();  
        })
        .toPromise()
        .catch(err => {

          console.log(err);
          var obj = JSON.parse(err._body);

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
      this.dangerModal.show();
      this.showSpinner = false;
    }
  }

}
