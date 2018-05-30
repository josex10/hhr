import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Directives 
import { EspaciosRequeridos } from './directivas/validation.required.directive';
import { ValidarCorreo } from './directivas/validation.email.directive';



//ROUTING
import { AppRoutingModule } from './app-routing.module';

//FILTER
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

//SERVICES

//PIPES
import { FilterPipe }from './pipes/filter.pipe';

//MDBOOTSTRAP
import { MDBBootstrapModules } from 'ng-mdb-pro';
import { MDBSpinningPreloader } from 'ng-mdb-pro';



import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { Section1Component } from './inicio/section1/section1.component';
import { Section2Component } from './inicio/section2/section2.component';
import { Section3Component } from './inicio/section3/section3.component';
import { Section4Component } from './inicio/section4/section4.component';
import { NavbarComponent } from './inicio/navbar/navbar.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { Section5Component } from './inicio/section5/section5.component';
import { LoaderComponent } from './inicio/loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateClientComponent } from './dashboard/create-client/create-client.component';
import { ListClientsComponent } from './dashboard/list-clients/list-clients.component';
import { EditClientComponent } from './dashboard/edit-client/edit-client.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    NavbarComponent,
    FooterComponent,
    Section5Component,
    LoaderComponent,
    DashboardComponent,
    CreateClientComponent,
    ListClientsComponent,
    EditClientComponent,
    EspaciosRequeridos,
    ValidarCorreo,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModules.forRoot(),
    AppRoutingModule,
    Ng2FilterPipeModule,
    FormsModule
  ],
  providers: [
    MDBSpinningPreloader,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
