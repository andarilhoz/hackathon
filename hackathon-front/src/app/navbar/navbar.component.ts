import { Component, OnInit } from '@angular/core';

import { User } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  user: User;

  constructor() { }

  ngOnInit() {
    
  }

}
