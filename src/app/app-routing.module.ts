import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateClientComponent } from './dashboard/create-client/create-client.component';
import { ListClientsComponent } from './dashboard/list-clients/list-clients.component';
import { EditClientComponent } from './dashboard/edit-client/edit-client.component';

/*
{path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'listClients', pathMatch: 'full' },
      { path: 'listClients', component: ListClientsComponent },
      { path: 'createClient', component: CreateClientComponent },
      { path: 'editClient', component: EditClientComponent }
    ]
  }
*/

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'listClients', pathMatch: 'full' },
      { path: 'listClients', component: ListClientsComponent },
      { path: 'createClient', component: CreateClientComponent },
      { path: 'editClient/:email', component: EditClientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }