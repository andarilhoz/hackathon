import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authentication.service';

declare var $: any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {};
  logged: boolean = false;
  avatar: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }
  
  
  ngOnInit() {
    	let nav = $('.nav-container');
    	$(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          nav.addClass("f-nav");
        } else {
          nav.removeClass("f-nav");
        }
      });


      if(this.router.url != '/login' && this.router.url != '/register'  ){
        this.getUserData();
      }
      this.authenticationService.emittLogin.subscribe(
        loggin => {
          this.logged = loggin;
          if(loggin){
            this.getUserData();
          } 
        }
      );
  }

  getUserData() {
    this.user = this.userService.getMe().subscribe(
          data => {
            this.logged = true;
            this.user = data;
            this.userService.getAvatar(data._id)
                .subscribe(
                  data => {
                    this.avatar = data;
                  },
                  error => {
                    console.log(error);
                  }
                )
          },
          error => {
            this.logged = false;
          });       
  }
  
}