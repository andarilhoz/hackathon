import { Component, OnInit } from '@angular/core';


import { UserService } from '../shared/user.service';
import { User } from '../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any
  myData: any = {
    pos: 1,
    userScore: 0,
    lastMonth: 0,
    media: 0
  };
  economy: any;
  topUsers : Array<any>  = [ ]
  
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUserData();
  }


  getUserData() {
    this.user = this.userService.getMe().subscribe(
          dataMe => {
            this.user = dataMe
            this.userService.getMeAll(this.user).subscribe(
              data => {
                this.topUsers = data[0]
                this.topUsers.forEach((user : User)=>{
                  user.userScore = 0
                  user.contas.forEach((conta,index)=>{  
                    user.userScore += this.calculateLastTwoScore(user,index)
                  })
                })
                this.topUsers.sort((user1: User, user2:User) => user1.userScore < user2.userScore ? 1 : -1)
                this.myData = data[0].filter((user)=>{return user.username == data[1].username})[0]
                this.myData.pos = this.topUsers.indexOf(this.myData) + 1;
                this.myData.lastMonth = this.lastMonthEconomy(this.myData);
                let total = 0
                let media = this.myData.contas.forEach((conta)=>{
                  total += this.parseValorIntoInt(conta.valor)
                })
                this.myData.media = total/this.myData.contas.length;
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

  lastMonthEconomy(user){
      let userCount = 0;
      let contaNova = this.parseValorIntoInt(user.contas[0].valor)
      let contaAntiga = this.parseValorIntoInt(user.contas[1].valor)
      let porcentagem = 0;
      if( contaNova > contaAntiga){
        //fudeu
        porcentagem += contaAntiga / contaNova * 100
      }else{
        //suave
        porcentagem -= contaNova / contaAntiga * 100
      }
      
      return  Math.trunc(porcentagem)
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
