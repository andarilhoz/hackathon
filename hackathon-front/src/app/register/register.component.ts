import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from '../interfaces/user';



declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(/*private userService: UserService,*/ private router: Router) { }

  public user: User;

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmEmail: '',
      cpf: '',
      inscricao: '',
      id: '',
      spended: '',
      percent: ''
    }
  }

  save(model: User, isValid: boolean) {
    alert("oi")
    Materialize.toast(`Usuario criado com sucesso `, 4000, 'blue rounded')
    if(isValid){
      /*this.userService.register(model).subscribe(
        userId => {
          Materialize.toast(`Usuario criado com sucesso `, 4000, 'blue rounded')
          this.router.navigate(['/']);
        },
        err => {
          err.forEach((error)=>{
            Materialize.toast((error.length > 1 ? error : error.message),4000, 'red rounded');
          })        
        }
      );*/
    }
  }

}