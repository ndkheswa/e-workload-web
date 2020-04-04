import { Component, OnInit } from '@angular/core';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { Router, NavigationStart } from '@angular/router';
import { EnvService } from '../env.service';

const env = new EnvService();
@Component({
  selector: 'app-login',
  template: `<div id="okta-signin-container"></div>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn;
  widget = new OktaSignIn({
    baseUrl: `${env.oktaUrl}`,
    authParams: { pkce: true }
  });
  constructor(private oktaAuth: OktaAuthService, private router: Router) {
    this.signIn = oktaAuth;
    // Show the widget when prompted, otherwise remote it from the DOM
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/clients':
            break;
          case '/register-client':
          break;
          default:
            this.widget.hide();
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.widget.renderEl ({
      el: '#okta-signin-container'},
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect('/clients', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }

}
