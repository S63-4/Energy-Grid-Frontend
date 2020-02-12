import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private authSource = new BehaviorSubject(false);
  authBoolean = this.authSource.asObservable();

  constructor() { }

  changeAuth(login: boolean){
    this.authSource.next(login);
  }

}