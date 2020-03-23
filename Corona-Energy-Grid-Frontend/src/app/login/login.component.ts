import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedDataService } from '../localdata/shared-data.service';
import { AuthenticationService } from '../REST/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientNr: number;
  password: string;
  loginResult: boolean;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private data: SharedDataService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.getLogin(this.clientNr, this.password)
      .subscribe(result => {
        console.log(result);
        result.headers.get('Authorization');
        console.log(result.header.get('Authorization'));
        this.router.navigate(['dashboard']);
        this.data.changeAuth(result);
      },
        error => {
          console.error(error)
        });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
