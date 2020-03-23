import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { user } from "../domain/user";
import { AppConfig } from "../app.config";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private serverURL = "http://localhost:9000"; // URL to rest server
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  /** GET login codes from the server */
  getLogin(clientnr: string, password: string) {
    const URL = `${this.serverURL}/login`;
    this.http
      .post<HttpResponse<any>>(
        URL,
        { username: clientnr, password },
        { observe: "response" }
      )
      .subscribe(
        response => {
          var token = response.headers.get("Authorization");
          if (token) {
            localStorage.setItem(AppConfig.LocalStorageKeys.TOKEN, token);
          }
          this.isLoggedIn.next(!!token);
        },
        error => {
          console.error(error);
        }
      );
  }

  //* Check if logged in */
  public loggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  //* Get authorization token */
  public getAuthorizationToken(): string {
    return localStorage.getItem(AppConfig.LocalStorageKeys.TOKEN);
  }

  //* Logout */
  public logOut(): void {
    this.isLoggedIn.next(false);
  }

  /** POST: add a new user to the server */
  postRegister(user: user): Observable<any> {
    const serverURL = this.serverURL + "UserController/registration";
    return this.http.post<user>(serverURL, user).pipe(
      map(result => (result as unknown) as string),
      catchError(this.handleError<any>("postRegistert"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // Let the user know how to register properly
      console.log(error);
      alert(error.error.text);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
