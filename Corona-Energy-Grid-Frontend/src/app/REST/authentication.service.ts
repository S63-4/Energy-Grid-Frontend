import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { user } from '../domain/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private serverURL= 'http://localhost:port/'; //URL to rest server

  constructor(
    private http: HttpClient) { }

  /** GET login codes from the server */
  getLogin(clientnr: number, password: string): Observable<any> {
    // const URL = `${this.serverURL}/loginCode/${clientnr}`;
    // console.log(URL);
    // return this.http.get<any>(URL)
    // .pipe(
    //   map(result=> { return result['LoginCodeExist'] as boolean }),
    //   catchError(this.handleError('getLogin', []))
    // );
    var result;
    if (clientnr == 123 && password == "test"){
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  /** POST: add a new user to the server */
  postRegister(user: user): Observable<any> {
    const serverURL = this.serverURL + "/registerUser";
    return this.http.post<user>(serverURL, user, httpOptions).pipe(
      catchError(this.handleError<user>('registerUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
