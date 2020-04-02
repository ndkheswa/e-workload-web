import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  CLIENT_ID = '{clientId}';
  ISSUER = 'https://domainUrl/oauth2/default';
  LOGIN_REDIRECT_URI = 'http://localhost:4200/implicit/callback';
  LOGOUT_REDIRECT_URI = 'http://localhost:4200';

  private authClient = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer: this.ISSUER,
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true
  });

  public $isAuthenticated: Observable<boolean>;
  private observer: Observer<boolean>;
  constructor(private router: Router) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then( val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.authClient.tokenManager.get('accessToken'));
  }

  async login(originalUrl) {
    // Save current url before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // launches the login redirect
    this.authClient.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokens = await this.authClient.token.parseFromUrl();
    tokens.forEach(token => {
      if (token.idToken) {
        this.authClient.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.authClient.tokenManager.add('accessToken', token);
      }
    });

    if (await this.isAuthenticated()) {
      this.observer.next(true);
    }

    // retrive the saved url and logout
    const url = sessionStorage.getItem('okta-app-url');
    this.router.navigateByUrl(url);

  }

  async logout() {
    await this.authClient.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
  }
}
