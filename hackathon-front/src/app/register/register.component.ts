import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from '../interfaces/user';
import { UserService } from '../shared/user.service';



declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) { }

  public user: User;

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmEmail: '',
      cpf: '',
      inscricao: '',
      _id: '',
      spended: '',
      percent: '',
      userScore: 0,
      userCount: 0,
      contas: []
    }
  }

  save(model: User, isValid: boolean) {
    if(isValid){
      this.userService.register(model).subscribe(
        userId => {
          Materialize.toast(`Usuario criado com sucesso `, 4000, 'blue rounded')
          this.router.navigate(['/']);
        },
        err => {
          err.forEach((error)=>{
            Materialize.toast((error.length > 1 ? error : error.message),4000, 'red rounded');
          })        
        }
      );
    }
  }

}