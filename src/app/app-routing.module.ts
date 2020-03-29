import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'register-client', component: AddClientComponent },
  { path: 'edit-client', component: EditClientComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
