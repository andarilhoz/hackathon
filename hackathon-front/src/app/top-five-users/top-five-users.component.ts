import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';


@Component({
  selector: 'app-top-five-users',
  templateUrl: './top-five-users.component.html',
  styleUrls: ['./top-five-users.component.css']
})
export class TopFiveUsersComponent implements OnInit {

  topUsers : Array<any>  = [
    {id: '1',username:'magno',spended:'100',percent: '10%'},
    {id: '2',username:'joao',spended:'50',percent: '30%'},
    {id: '3',username:'marcos',spended:'120',percent: '80%'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
