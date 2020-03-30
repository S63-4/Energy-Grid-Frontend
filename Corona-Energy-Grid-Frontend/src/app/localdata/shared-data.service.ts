import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private authSource = new BehaviorSubject('');
  authBoolean = this.authSource.asObservable();

  constructor() { }

  changeAuth(login: string) {
    this.authSource.next(login);
  }
}
