import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [ OktaAuthGuard ], data: { onAuthRequired } },
  { path: 'register-client', component: AddClientComponent, canActivate: [ OktaAuthGuard ], data: { onAuthRequired } },
];

export function onAuthRequired({ oktaAuth, router }) {
  router.navigate(['/login']);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
