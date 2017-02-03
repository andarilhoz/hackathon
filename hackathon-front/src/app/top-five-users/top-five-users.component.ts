import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-top-five-users',
  templateUrl: './top-five-users.component.html',
  styleUrls: ['./top-five-users.component.css']
})
export class TopFiveUsersComponent implements OnInit {

  topUsers : Array<any>  = [ ]

  constructor(private userService: UserService) { }

  parseValorIntoInt(valor: string): number{
    return Number(valor.replace(',','.'))
  }

  ngOnInit() {
    this.userService.getAll().subscribe(
          data => {
            this.topUsers = data
            this.topUsers.forEach((user : User)=>{
              user.userScore = 0
              user.contas.forEach((conta,index)=>{  
                user.userScore += this.calculateLastTwoScore(user,index)
              })
            })
            this.topUsers.sort((user1: User, user2:User) => user1.userScore < user2.userScore ? 1 : -1)
            this.topUsers = this.topUsers.slice(0,4);
          },
          error => {
            console.log(error);
          });       
  }  

  calculateLastTwoScore(user, index){
      let userCount = 0;
      if(index != 0 && index != user.contas.length){
        let contaNova = this.parseValorIntoInt(user.contas[index-1].valor)
        let contaAntiga = this.parseValorIntoInt(user.contas[index].valor)
        let porcentagem = 0;
        if( contaNova > contaAntiga){
          //fudeu
          porcentagem = contaAntiga / contaNova * 100
          userCount -= porcentagem * 100
        }else{
          //suave
          porcentagem = contaNova / contaAntiga * 100
          userCount += porcentagem * 1000
        }
      }
      return  Math.trunc(userCount);
  }

}
