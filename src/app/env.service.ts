import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  production: true;
  apiRoot: 'http://localhost:8080';
  clientId: '0oa58kmqkl4gfndAb4x6';
  oktaDomain = 'dev-568888.okta.com';
  oktaUrl = 'https://dev-568888.okta.com';
  public enableDebug = false;

  constructor() { }
}
