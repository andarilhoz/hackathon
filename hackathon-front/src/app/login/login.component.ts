import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from '../shared/authentication.service'
import { UserService } from '../shared/user.service';

declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.logout().subscribe(
      data => {
        
       },
       error => {
         console.log(error)
       }
    );
  }

  login(){
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            Materialize.toast('User or password doesnt match',4000, 'red rounded');
            this.loading = false;
          });    
  }

}
