import { Component, OnInit } from '@angular/core';
import { user } from '../domain/user';
import { AuthenticationService } from '../REST/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  clientNr: number;
  email: string;
  password: string;
  street: string;
  houseNr: number;
  zipCode: string;

  newuser: user;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void {
      this.newuser = new user(this.firstName, this.lastName, this.clientNr, this.email, this.password, this.street, this.houseNr, this.zipCode);
      this.authenticationService.postRegister(this.newuser);
      this.router.navigate(['dashboard']);
  }
}
