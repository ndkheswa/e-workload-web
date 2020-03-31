import { Injectable, Inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../models/client.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.apiUrl = baseUrl; }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remove logging infrastructure
      console.error(error);    // log to console instead

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  getClients(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/v1/clients');
  }

  public create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + '/api/v1/clients', client, this.httpOptions);
  }

}
