import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Servicios
import { AppService } from '../services/app.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AppService]
})
export class DashboardComponent implements OnInit {

  constructor(private _AppService : AppService,  private router: Router) { }

  ngOnInit() {
    var usuario = this._AppService.solicitarUsuarioEnLocalStorage();

    if(!usuario){
      this.router.navigate(['']);
    }

  }

  fnLogOut(){
    console.log("Cerrando");
    this._AppService.fnCerrarSesion();
    this.router.navigate(['']);
  }

}
