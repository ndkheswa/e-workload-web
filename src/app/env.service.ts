import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  production: true;
  apiRoot: '';
  clientId: '';
  oktaDomain = '';
  oktaUrl = '';
  public enableDebug = false;

  constructor() { }
}
