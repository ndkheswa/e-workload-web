import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientsComponent } from './add-clients/add-clients.component';
import { ClientsComponent } from './clients/clients.component';
import { EditClientsComponent } from './edit-clients/edit-clients.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'register-client', component: AddClientsComponent },
  { path: 'edit-clients', component: EditClientsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', loadChildren: () => import('./clients/clients.component').then(m => m.ClientsComponent )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
