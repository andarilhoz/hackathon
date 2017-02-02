import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   model: any = {};

  constructor() { }

  ngOnInit() {
  }

}
