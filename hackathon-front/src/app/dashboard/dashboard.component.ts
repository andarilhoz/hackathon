import { Component, OnInit } from '@angular/core';


import { UserService } from '../shared/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any
  topUsers : Array<any>  = [ ]
  
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUserData();
  }


  getUserData() {
    this.user = this.userService.getMe().subscribe(
          data => {
            this.user = data
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
                debugger
            },
            error => {
              console.log(error);
            });  
          },
          error => {
            console.log(error)
          });       
  }

    parseValorIntoInt(valor: string): number{
      return Number(valor.replace(',','.'))
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
