import { Component, OnInit } from '@angular/core';
import { user } from '../domain/user';
import { AuthenticationService } from '../REST/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  customerCode: number;
  email: string;
  password: string;
  privacyConfirm: string;

  newuser: user;

  passwordConfirm: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void {
      this.newuser = new user(this.customerCode, this.email, this.password);
      if (this.privacyConfirm == null){
        alert('Please read and accept the privacy policy!');
      }
      else{
        if (this.password === this.passwordConfirm) {
          console.log(this.privacyConfirm);
          this.authenticationService.postRegister(this.newuser).subscribe(
            result => {
              if (result === 'saved') {
                this.router.navigate(['dashboard']);
              }
            }
          );
        } else {
          alert('Make sure passwords match.');
        }
      }
  }
}
