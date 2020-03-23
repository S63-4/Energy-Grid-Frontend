import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { user } from '../domain/user';
import { Http, Headers, Response } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private serverURL = 'http://localhost:9000'; // URL to rest server

  constructor(
    private http: HttpClient) { }

  /** GET login codes from the server */
  getLogin(clientnr: number, password: string){
    const URL = `${this.serverURL}/login`;
    return this.http.post<any>(URL, {username: clientnr, password}, httpOptions);
  }

  /** POST: add a new user to the server */
  postRegister(user: user): Observable<any> {
    const serverURL = this.serverURL + 'UserController/registration';
    return this.http.post<user>(serverURL, user, httpOptions).pipe(
      map(result => result as unknown as string),
      catchError(this.handleError<any>('postRegistert'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Let the user know how to register properly
      console.log(error);
      alert(error.error.text);


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
